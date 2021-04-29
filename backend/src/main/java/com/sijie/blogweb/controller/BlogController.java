package com.sijie.blogweb.controller;

import com.sijie.blogweb.pojo.Blog;
import com.sijie.blogweb.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;

    @GetMapping("/blogtest")
    public List<Blog> getAllBlogs() {
        return (List<Blog>) blogRepository.findAll();
    }
}
