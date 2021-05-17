package com.sijie.blogweb.controller;

import com.sijie.blogweb.pojo.Blog;
import com.sijie.blogweb.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.EntityModel;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RepositoryRestController
@RequestMapping(value = "/blog")
public class BlogController {

    private final BlogRepository blogRepository;

    @Autowired
    public BlogController(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getBlogDetail(@PathVariable("id") long id) {
        Optional<Blog> result = blogRepository.findById(id);
        if (result.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Blog resultBlog = blogRepository.findById(id).get();

        // increment views
        resultBlog.setViews(resultBlog.getViews() + 1);
        blogRepository.save(resultBlog);

        EntityModel<Blog> resource = EntityModel.of(resultBlog);
        resource.add(linkTo(methodOn(BlogController.class).getBlogDetail(resultBlog.getId())).withSelfRel());
        resource.add(linkTo(BlogController.class).withRel("blog"));

        return ResponseEntity.ok(resource);
    }

//    @RequestMapping(value = "/blog", method = RequestMethod.GET)
//    @ResponseBody
//    public ResponseEntity<?> getBlogs() {
//        Iterable<Blog> blogs = blogRepository.findAll();
//
//        // add business logic here
//        //
//
//        List<EntityModel<Blog>> resources = new ArrayList<>();
//        for (Blog blog: blogs) {
//            EntityModel<Blog> resource = EntityModel.of(blog);
//            resource.add(linkTo(methodOn(BlogController.class).getBlogDetail(blog.getId())).withSelfRel());
//            resource.add(linkTo(methodOn(BlogController.class).getBlogs()).withRel("blog"));
//            resources.add(resource);
//        }
//
//        CollectionModel<EntityModel<Blog>> collection = CollectionModel.of(resources);
//        collection.add(linkTo(methodOn(BlogController.class).getBlogs()).withSelfRel());
//
//        return ResponseEntity.ok(collection);
//    }

}
