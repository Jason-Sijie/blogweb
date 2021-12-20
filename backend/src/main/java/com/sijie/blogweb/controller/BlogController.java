package com.sijie.blogweb.controller;

import com.sijie.blogweb.exception.ResourceNotFoundException;
import com.sijie.blogweb.exception.handler.ErrorMessage;
import com.sijie.blogweb.model.Blog;
import com.sijie.blogweb.repository.BlogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/blogs")
public class BlogController {
    private static Logger logger = LoggerFactory.getLogger(BlogController.class);

    private final BlogRepository blogRepository;

    @Autowired
    public BlogController(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @GetMapping(value = "/{id}")
    public Page<Blog> getBlogDetail(@PathVariable("id") long id) {
        logger.info("Start getBlogDetail");

        Optional<Blog> result = blogRepository.findById(id);
        if (!result.isPresent()) {
            throw new ResourceNotFoundException("Resource not found");
        }
        Blog resultBlog = blogRepository.findById(id).get();

        // increment views
        resultBlog.setViews(resultBlog.getViews() + 1);
        blogRepository.save(resultBlog);

        Pageable pageable = PageRequest.of(0, 5);
        return blogRepository.findAll(pageable);
    }

}
