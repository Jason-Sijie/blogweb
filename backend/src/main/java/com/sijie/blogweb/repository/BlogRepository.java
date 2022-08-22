package com.sijie.blogweb.repository;

import com.sijie.blogweb.model.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends PagingAndSortingRepository<Blog, Long> {

    List<Blog> findByTitleContainingIgnoreCase(@Param("title") String titleValue);
    Page<Blog> findByTitleContainingIgnoreCase(@Param("title") String titleValue, Pageable pageable);
    Page<Blog> findAllByAuthorId(@Param("author_id") Long authorId, Pageable pageable);
    List<Blog> findAllByAuthorId(@Param("author_id") Long authorId);
    Page<Blog> findBlogsByTagsName(@Param("tag_name") String tagName, Pageable pageable);
    List<Blog> findBlogsByTagsName(@Param("tag_name") String tagName);
    List<Blog> findBlogsByAuthorIdAndTagsName(@Param("author_id") Long authorId, @Param("tag_name") String tagName);
    List<Blog> findByAuthorIdAndTitleContainingIgnoreCase(@Param("author_id") Long authorId, @Param("title") String titleValue);
    Page<Blog> findByAuthorIdAndTitleContainingIgnoreCase(@Param("author_id") Long authorId, @Param("title") String titleValue, Pageable pageable);
    List<Blog> findByTitleContainingIgnoreCaseAndTagsName(@Param("title") String titleValue, @Param("tag_name") String tagName);
    Page<Blog> findByTitleContainingIgnoreCaseAndTagsName(@Param("title") String titleValue, @Param("tag_name") String tagName, Pageable pageable);
}
