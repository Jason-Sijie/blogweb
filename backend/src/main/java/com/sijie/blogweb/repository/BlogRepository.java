package com.sijie.blogweb.repository;

import com.sijie.blogweb.pojo.Blog;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "blog", path = "blog")
public interface BlogRepository extends PagingAndSortingRepository<Blog, Long> {

    List<Blog> findByTitle(@Param("title") String titleValue);

}
