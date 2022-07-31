package com.sijie.blogweb.controller;

import com.google.common.base.MoreObjects;
import com.sijie.blogweb.exception.handler.InternalFaultException;
import com.sijie.blogweb.helper.AuthPrincipalHelper;
import com.sijie.blogweb.repository.redis.transaction.RedisTransaction;
import com.sijie.blogweb.repository.redis.transaction.RedisTransactionType;
import com.sijie.blogweb.exception.ResourceNotFoundException;
import com.sijie.blogweb.exception.UserCredentialsAbsenceException;
import com.sijie.blogweb.exception.UserUnauthorziedException;
import com.sijie.blogweb.helper.BlogHelper;
import com.sijie.blogweb.model.Blog;
import com.sijie.blogweb.repository.redis.BlogContentRepository;
import com.sijie.blogweb.repository.BlogRepository;
import com.sijie.blogweb.security.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/blogs")
public class BlogController {
    private static Logger logger = LoggerFactory.getLogger(BlogController.class);
    private static Integer DEFAULT_PAGE_SIZE = 10;

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
            inputBlog.setAuthorId(userDetails.getUid());
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
        } else if (!userDetails.getUid().equals(internalBlog.getAuthorId())){
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

    @GetMapping(value = "", params = {"bid"})
    @Transactional(isolation = Isolation.READ_COMMITTED)
    @RedisTransaction(type = RedisTransactionType.ReadOnly)
    public Blog getBlogDetailByBid(@RequestParam String bid) {
        Blog result = blogRepository.findByBid(bid);
        if (result == null) {
            throw new ResourceNotFoundException("Blog with bid: " + bid + " not found");
        }
        result.setContent(blogContentRepository.getBlogContent(result.getBid()));

        // increment views
        result.setViews(result.getViews() + 1);
        blogRepository.save(result);

        return result;
    }

    @GetMapping(value = "")
    @Transactional(readOnly = true)
    public Page<Blog> getAllBlogs(@RequestParam(name = "page", required = false) Integer page,
                                  @RequestParam(name = "size", required = false) Integer size) {
        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        return blogRepository.findAll(PageRequest.of(page, size));
    }

    @GetMapping(value = "", params = {"categoryId"})
    @Transactional(readOnly = true)
    public Page<Blog> getBlogsByCategoryId(@RequestParam("categoryId") String categoryId,
                                           @RequestParam(name = "page", required = false) Integer page,
                                           @RequestParam(name = "size", required = false) Integer size) {
        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        return blogRepository.findAllByCategoryId(categoryId, PageRequest.of(page, size));
    }

    @GetMapping(value = "", params = {"authorId"})
    @Transactional(readOnly = true)
    public Page<Blog> getBlogsByAuthorId(@RequestParam("authorId") String authorId,
                                           @RequestParam(name = "page", required = false) Integer page,
                                           @RequestParam(name = "size", required = false) Integer size) {
        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        return blogRepository.findAllByAuthorId(authorId, PageRequest.of(page, size));
    }

    @GetMapping(value = "", params = {"tagName"})
    @Transactional(readOnly = true)
    public Page<Blog> getBlogsByTagName(@RequestParam("tagName") String tagName,
                                         @RequestParam(name = "page", required = false) Integer page,
                                         @RequestParam(name = "size", required = false) Integer size) {
        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        return blogRepository.findBlogsByTagsName(tagName, PageRequest.of(page, size));
    }

    @GetMapping(value = "", params = {"tagNames"})
    @Transactional(readOnly = true)
    public Page<Blog> getBlogsByTagNames(@RequestParam("tagNames") List<String> tagNames,
                                        @RequestParam(name = "page", required = false) Integer page,
                                        @RequestParam(name = "size", required = false) Integer size) {
        if (tagNames == null || tagNames.isEmpty()) {
            return Page.empty();
        }

        List<Blog> result = blogRepository.findBlogsByTagsName(tagNames.get(0));
        for (int i = 1; i < tagNames.size(); i++) {
            List<Blog> blogs = blogRepository.findBlogsByTagsName(tagNames.get(i));
            result = result.stream().filter(element -> {
                for (Blog blog : blogs) {
                    if (blog.getId() == element.getId()) {
                        return true;
                    }
                }
                return false;
            }).collect(Collectors.toList());
        }

        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);
        return generatePageBlogResult(result, page, size);
    }

    @GetMapping(value = "", params = {"authorId", "tagNames"})
    @Transactional(readOnly = true)
    public Page<Blog> getBlogsByAuthorIdAndTagNames(@RequestParam("authorId") String authorId,
                                                    @RequestParam("tagNames") List<String> tagNames,
                                                    @RequestParam(name = "page", required = false) Integer page,
                                                    @RequestParam(name = "size", required = false) Integer size) {
        if (tagNames == null || tagNames.isEmpty()) {
            return Page.empty();
        }

        List<Blog> result = blogRepository.findBlogsByAuthorIdAndTagsName(authorId, tagNames.get(0));
        for (int i = 1; i < tagNames.size(); i++) {
            List<Blog> blogs = blogRepository.findBlogsByAuthorIdAndTagsName(authorId, tagNames.get(0));
            result = result.stream().filter(element -> {
                for (Blog blog : blogs) {
                    if (blog.getId() == element.getId()) {
                        return true;
                    }
                }
                return false;
            }).collect(Collectors.toList());
        }

        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);
        return generatePageBlogResult(result, page, size);
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
