package com.sijie.blogweb.controller;

import com.google.common.base.MoreObjects;
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
    @Transactional(isolation = Isolation.SERIALIZABLE)
    @PreAuthorize("hasAnyAuthority('BLOG_ALL', 'BLOG_CREATE')")
    public Blog createNewBlog(@RequestBody Blog inputBlog) {
        logger.info("Start createNewBlog");

        CustomUserDetails userDetails = AuthPrincipalHelper.getAuthenticationPrincipal();
        if (userDetails != null) {
            inputBlog.setAuthorId(userDetails.getUid());
        } else {
            throw new UserCredentialsAbsenceException("User credentials are required to create new blog");
        }
        Blog newBlog = blogHelper.validateAndBuildNewBlog(inputBlog);

        // persist to both data sources
        Blog internalBlog = blogRepository.save(newBlog);
        blogContentRepository.setBlogContent(newBlog.getBid(), newBlog.getContent());

        logger.info("Create new Blog: " + internalBlog);
        return internalBlog;
    }

    @GetMapping(value = "/{id}")
    @Transactional(isolation = Isolation.READ_COMMITTED)
    @RedisTransaction(type = RedisTransactionType.ReadOnly)
    public Blog getBlogDetailById(@PathVariable("id") long id) {
        logger.info("Start getBlogDetailById");

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
        logger.info("Start getBlogDetailByBid");

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
        logger.info("Start getAllBlogs");

        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        return blogRepository.findAll(PageRequest.of(page, size));
    }

    @GetMapping(value = "", params = {"categoryId"})
    @Transactional(readOnly = true)
    public Page<Blog> getBlogsByCategoryId(@RequestParam("categoryId") String categoryId,
                                           @RequestParam(name = "page", required = false) Integer page,
                                           @RequestParam(name = "size", required = false) Integer size) {
        logger.info("Start getBlogsByCategoryId");

        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        return blogRepository.findAllByCategoryId(categoryId, PageRequest.of(page, size));
    }

    @GetMapping(value = "", params = {"authorId"})
    @Transactional(readOnly = true)
    public Page<Blog> getBlogsByAuthorId(@RequestParam("authorId") String authorId,
                                           @RequestParam(name = "page", required = false) Integer page,
                                           @RequestParam(name = "size", required = false) Integer size) {
        logger.info("Start getBlogsByAuthorId");

        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        return blogRepository.findAllByAuthorId(authorId, PageRequest.of(page, size));
    }

    @GetMapping(value = "", params = {"tagName"})
    @Transactional(readOnly = true)
    public Page<Blog> getBlogsByTagName(@RequestParam("tagName") String tagName,
                                         @RequestParam(name = "page", required = false) Integer page,
                                         @RequestParam(name = "size", required = false) Integer size) {
        logger.info("Start getBlogsByTagName");

        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        return blogRepository.findBlogsByTagsName(tagName, PageRequest.of(page, size));
    }

    @GetMapping(value = "", params = {"tagNames"})
    @Transactional(readOnly = true)
    public Page<Blog> getBlogsByTagNames(@RequestParam("tagNames") List<String> tagNames,
                                        @RequestParam(name = "page", required = false) Integer page,
                                        @RequestParam(name = "size", required = false) Integer size) {
        logger.info("Start getBlogsByTagName");
        if (tagNames == null || tagNames.isEmpty()) {
            return Page.empty();
        }

        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

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

        List<Blog> pageResult = result.subList(page*size, page*size + size);
        return new PageImpl<Blog>(pageResult, PageRequest.of(page, size), result.size());
    }

    @PutMapping(value = "/{id}")
    @PreAuthorize("hasAnyAuthority('BLOG_ALL', 'BLOG_UPDATE')")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Blog updateBlogById(@PathVariable("id") long id, @RequestBody Blog inputBlog) {
        logger.info("Start updateBlogById");

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

}
