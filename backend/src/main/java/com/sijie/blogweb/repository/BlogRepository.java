package com.sijie.blogweb.repository;

import com.sijie.blogweb.model.Blog;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends PagingAndSortingRepository<Blog, Long> {

    List<Blog> findByTitle(@Param("title") String titleValue);
    Blog findBlogByBid(@Param("bid") String bid);

}
