package com.sijie.blogweb.controller;

import com.google.common.base.MoreObjects;
import com.google.common.base.Strings;
import com.google.common.base.Supplier;
import com.sijie.blogweb.exception.handler.InternalFaultException;
import com.sijie.blogweb.helper.AuthPrincipalHelper;
import com.sijie.blogweb.repository.redis.transaction.RedisTransaction;
import com.sijie.blogweb.repository.redis.transaction.RedisTransactionType;
import com.sijie.blogweb.exception.InvalidParameterException;
import com.sijie.blogweb.exception.ResourceNotFoundException;
import com.sijie.blogweb.exception.UserCredentialsAbsenceException;
import com.sijie.blogweb.exception.UserUnauthorziedException;
import com.sijie.blogweb.helper.BlogHelper;
import com.sijie.blogweb.model.Blog;
import com.sijie.blogweb.model.User;
import com.sijie.blogweb.model.request.SortField;
import com.sijie.blogweb.repository.redis.BlogContentRepository;
import com.sijie.blogweb.repository.BlogRepository;
import com.sijie.blogweb.repository.UserRepository;
import com.sijie.blogweb.security.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/blogs")
public class BlogController {
    private static Logger logger = LoggerFactory.getLogger(BlogController.class);
    private static final Integer DEFAULT_PAGE_SIZE = 10;
    private static final int MAX_SEARCH_TAGS = 5;  
    private static final List<String> ALLOWED_SORT_PROPERTIES = Arrays.asList("likes", "views", "gmtCreate", "gmtUpdate");

    private final BlogRepository blogRepository;
    private final BlogHelper blogHelper;
    private final BlogContentRepository blogContentRepository;

    @Autowired
    public BlogController(BlogRepository blogRepository,
                          BlogContentRepository blogContentRepository,
                          BlogHelper blogHelper) {
        this.blogRepository = blogRepository;
        this.blogContentRepository = blogContentRepository;
        this.blogHelper = blogHelper;
    }

    @PostMapping(value = "", consumes = {"application/json"})
    @PreAuthorize("hasAnyAuthority('BLOG_ALL', 'BLOG_CREATE')")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    @RedisTransaction(type = RedisTransactionType.WriteOnly)
    public Blog createNewBlog(@RequestBody Blog inputBlog) {
        CustomUserDetails userDetails = AuthPrincipalHelper.getAuthenticationPrincipal();
        if (userDetails != null) {
            inputBlog.setAuthorId(userDetails.getId());
        } else {
            throw new UserCredentialsAbsenceException("You must log in before creating a new blog");
        }
        Blog newBlog = blogHelper.validateAndBuildNewBlog(inputBlog);

        // persist to both data sources
        Blog internalBlog = blogRepository.save(newBlog);
        blogContentRepository.setBlogContent(newBlog.getBid(), newBlog.getContent());

        logger.info("Create new Blog: " + internalBlog);
        return internalBlog;
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasAnyAuthority('BLOG_ALL', 'BLOG_UPDATE')")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    @RedisTransaction(type = RedisTransactionType.WriteOnly)
    public Blog updateBlogById(@PathVariable("id") long id, @RequestBody Blog inputBlog) {
        Optional<Blog> result = blogRepository.findById(id);
        if (!result.isPresent()) {
            throw new ResourceNotFoundException("Blog with id: " + id + " not found");
        }
        Blog internalBlog = result.get();

        CustomUserDetails userDetails = AuthPrincipalHelper.getAuthenticationPrincipal();
        if (userDetails == null) {
            throw new UserCredentialsAbsenceException("User credentials are required to create new blog");
        } else if (userDetails.getId() != internalBlog.getAuthorId()){
            throw new UserUnauthorziedException("User " + userDetails.getUsername() + " is Unauthorized to perform update operation on blog " + internalBlog.getBid());
        }

        internalBlog = blogHelper.validateAndUpdateBlog(inputBlog, internalBlog);
        if (internalBlog.getContent() != null) {
            blogContentRepository.setBlogContent(internalBlog.getBid(), internalBlog.getContent());
        }
        blogRepository.save(internalBlog);

        logger.info("Update Blog " + internalBlog);
        return internalBlog;
    }

    @GetMapping(value = "/{id}/isLiked")
    @Transactional(isolation = Isolation.READ_COMMITTED)
    @RedisTransaction(type = RedisTransactionType.ReadOnly)
    public Blog isBlogLikedByUser(@PathVariable("id") long id) {
        Optional<Blog> result = blogRepository.findById(id);
        if (!result.isPresent()) {
            throw new ResourceNotFoundException("Blog with id: " + id + " not found");
        }
        Blog blog = result.get();

        CustomUserDetails userDetails = AuthPrincipalHelper.getAuthenticationPrincipal();
        if (userDetails == null) {
            throw new UserCredentialsAbsenceException("User credentials are required");
        }

        boolean isLiked = false;
        for (User likedUser : blog.getLikedUsers()) {
            if (likedUser.getId().equals(userDetails.getId())) {
                isLiked = true;
                break;
            }
        }

        return isLiked ? blog : null;
    }

    @PutMapping(value = "/{id}/like")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public String likeABlogById(@PathVariable("id") long id) {
        Optional<Blog> result = blogRepository.findById(id);
        if (!result.isPresent()) {
            throw new ResourceNotFoundException("Blog with id: " + id + " not found");
        }
        Blog internalBlog = result.get();

        CustomUserDetails userDetails = AuthPrincipalHelper.getAuthenticationPrincipal();
        if (userDetails == null) {
            throw new UserCredentialsAbsenceException("User credentials are required to like a blog");
        }

        Blog blog = blogHelper.likeABlog(internalBlog, userDetails.getUsername());
        if (blog == null) {
            throw new InternalFaultException("Failed to like the blog " + blog.getBid());
        }

        blogRepository.save(blog);
        return "User " + userDetails.getUsername() + " successfully liked the blog " + blog.getBid();
    }

    @PutMapping(value = "/{id}/unlike")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public String unlikeABlogById(@PathVariable("id") long id) {
        Optional<Blog> result = blogRepository.findById(id);
        if (!result.isPresent()) {
            throw new ResourceNotFoundException("Blog with id: " + id + " not found");
        }
        Blog internalBlog = result.get();

        CustomUserDetails userDetails = AuthPrincipalHelper.getAuthenticationPrincipal();
        if (userDetails == null) {
            throw new UserCredentialsAbsenceException("User credentials are required to like a blog");
        }

        Blog blog = blogHelper.unlikeABlog(internalBlog, userDetails.getUsername());
        if (blog == null) {
            throw new InternalFaultException("Failed to unlike the blog " + blog.getBid());
        }

        blogRepository.save(blog);
        return "User " + userDetails.getUsername() + " successfully unliked the blog " + blog.getBid();
    }

    @GetMapping(value = "/{id}")
    @Transactional(isolation = Isolation.READ_COMMITTED)
    @RedisTransaction(type = RedisTransactionType.ReadOnly)
    public Blog getBlogDetailById(@PathVariable("id") long id) {
        Optional<Blog> result = blogRepository.findById(id);
        if (!result.isPresent()) {
            throw new ResourceNotFoundException("Blog with id: " + id + " not found");
        }
        Blog resultBlog = result.get();
        resultBlog.setContent(blogContentRepository.getBlogContent(resultBlog.getBid()));

        // increment views
        resultBlog.setViews(resultBlog.getViews() + 1);
        blogRepository.save(resultBlog);

        return resultBlog;
    }

    @GetMapping(value = "")
    @Transactional(readOnly = true)
    public Page<Blog> getAllBlogs(@RequestParam(name = "authorId", required = false) Long authorId,
                                    @RequestParam(name = "tagNames", required = false) List<String> tagNames,
                                    @RequestParam(name = "title", required = false) String title,
                                    @RequestParam(name = "page", required = false) Integer page,
                                    @RequestParam(name = "size", required = false) Integer size, 
                                    @RequestParam(name = "sorts", required = false) List<String> sortProperties,
                                    @RequestParam(name = "directions", required = false) List<Direction> sortDirections) {
        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        Sort sort = validateAndBuildSortFields(sortProperties, sortDirections);

        if (isTagNamesEmpty(tagNames) && authorId == null && Strings.isNullOrEmpty(title)) {
            return blogRepository.findAll(PageRequest.of(page, size, sort));
        }

        if (isTagNamesEmpty(tagNames)) {
            if (authorId == null) {
                // only title not null
                return blogRepository.findBlogsByTitleContainingIgnoreCase(title, PageRequest.of(page, size, sort));
            } else if (Strings.isNullOrEmpty(title)) {
                // only authorId not null
                return blogRepository.findBlogsByAuthorId(authorId, PageRequest.of(page, size, sort));
            } else {
                // both authorId and title not null 
                return blogRepository.findBlogsByAuthorIdAndTitleContainingIgnoreCase(authorId, title, PageRequest.of(page, size, sort));
            }
        } else {
            // tagNames not null
            if (tagNames.size() > MAX_SEARCH_TAGS) {
                throw new InvalidParameterException("Invalid parameter: We do not support search by more than 5 tags");
            }

            List<Blog> previousResult = null;
            if (authorId == null && Strings.isNullOrEmpty(title)) {
                // search by tagnames only
                List<Blog> currentResult = searchBlogsByTagNamesAndOtherParams((tagName) -> {
                    return blogRepository.findBlogsByTagsName(tagName, sort);
                }, tagNames);
                previousResult = intersectTwoBlogLists(previousResult, currentResult);
            }
            if (authorId != null) {
                List<Blog> currentResult = searchBlogsByTagNamesAndOtherParams((tagName) -> {
                    return blogRepository.findBlogsByAuthorIdAndTagsName(authorId, tagName, sort);
                }, tagNames);
                previousResult = intersectTwoBlogLists(previousResult, currentResult);
            }
            if (!Strings.isNullOrEmpty(title)) {
                List<Blog> currentResult = searchBlogsByTagNamesAndOtherParams((tagName) -> {
                    return blogRepository.findBlogsByTitleContainingIgnoreCaseAndTagsName(title, tagName, sort);
                }, tagNames);
                previousResult = intersectTwoBlogLists(previousResult, currentResult);
            }

            return generatePageBlogResult(previousResult, page, size);
        }        
    }

    private boolean isTagNamesEmpty(List<String> tagNames) {
        return tagNames == null || tagNames.isEmpty();
    }

    private List<Blog> searchBlogsByTagNamesAndOtherParams(Function<String, List<Blog>> search, List<String> tagNames) {
        List<Blog> result = search.apply(tagNames.get(0));
        for (int i = 1; i < tagNames.size(); i++) {
            List<Blog> blogs = search.apply(tagNames.get(i));
            result = intersectTwoBlogLists(result, blogs);
        }
        return result;
    } 

    private List<Blog> intersectTwoBlogLists(List<Blog> preList, List<Blog> curList) {
        if (preList == null) {
            return curList;
        }

        return preList.stream().filter(element -> {
            for (Blog blog: curList) {
                if (blog.getId() == element.getId()) {
                    return true;
                }
            }
            return false;
        }).collect(Collectors.toList());
    }

    private Sort validateAndBuildSortFields(List<String> sortProperties, List<Direction> sortDirections) {
        if (CollectionUtils.isEmpty(sortProperties)) {
            return Sort.unsorted();
        }
        if (CollectionUtils.isEmpty(sortDirections) || sortProperties.size() != sortDirections.size()) {
            throw new InvalidParameterException("Invalid Parameter: Number of sort properties does not match with number of directions");
        }

        Sort finalSort = Sort.by(sortDirections.get(0), sortProperties.get(0));
        for (int i = 0; i < sortProperties.size(); i++) {
            String property = sortProperties.get(i);
            Direction direction = sortDirections.get(i);
            if (!ALLOWED_SORT_PROPERTIES.contains(property)) {
                throw new InvalidParameterException("Invalid Parameter: We do not support sorting on property " + property);
            }
            Sort sort = Sort.by(direction, property);
            finalSort = finalSort.and(sort);
        }
        return finalSort;
    }

    private Page<Blog> generatePageBlogResult(List<Blog> blogs, int page, int size) {
        List<Blog> pageResult;
        if (page*size < blogs.size()) {
            pageResult = blogs.subList(page*size, Math.min(page*size + size, blogs.size()));
        } else {
            pageResult = Collections.emptyList();
        }

        return new PageImpl<Blog>(pageResult, PageRequest.of(page, size), blogs.size());
    }

}
