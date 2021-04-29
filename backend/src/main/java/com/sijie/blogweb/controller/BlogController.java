package com.sijie.blogweb.controller;

import com.sijie.blogweb.pojo.Blog;
import com.sijie.blogweb.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RepositoryRestController
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;
}
