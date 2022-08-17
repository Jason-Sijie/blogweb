package com.sijie.blogweb.repository;

import com.sijie.blogweb.model.Tag;

import java.util.List;
import java.util.Set;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends PagingAndSortingRepository<Tag, Long> {
    Tag findByName(@Param("name") String tagName);
    Set<Tag> findTagsByBlogsId(@Param("blog_id") Long blogId);
}
