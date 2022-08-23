package com.sijie.blogweb.repository;

import com.sijie.blogweb.model.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends PagingAndSortingRepository<Blog, Long> {

    List<Blog> findBlogsByTitleContainingIgnoreCase(@Param("title") String titleValue);
    Page<Blog> findBlogsByTitleContainingIgnoreCase(@Param("title") String titleValue, Pageable pageable);

    Page<Blog> findBlogsByAuthorId(@Param("author_id") Long authorId, Pageable pageable);
    List<Blog> findBlogsByAuthorId(@Param("author_id") Long authorId);

    Blog findByBid(@Param("bid") String bid);

    Page<Blog> findBlogsByTagsName(@Param("tag_name") String tagName, Pageable pageable);
    List<Blog> findBlogsByTagsName(@Param("tag_name") String tagName);
    List<Blog> findBlogsByTagsName(@Param("tag_name") String tagName, Sort sort);

    List<Blog> findBlogsByAuthorIdAndTagsName(@Param("author_id") Long authorId, @Param("tag_name") String tagName);
    List<Blog> findBlogsByAuthorIdAndTagsName(@Param("author_id") Long authorId, @Param("tag_name") String tagName, Sort sort);

    List<Blog> findBlogsByAuthorIdAndTitleContainingIgnoreCase(@Param("author_id") Long authorId, @Param("title") String titleValue);
    Page<Blog> findBlogsByAuthorIdAndTitleContainingIgnoreCase(@Param("author_id") Long authorId, @Param("title") String titleValue, Pageable pageable);

    List<Blog> findBlogsByTitleContainingIgnoreCaseAndTagsName(@Param("title") String titleValue, @Param("tag_name") String tagName);
    List<Blog> findBlogsByTitleContainingIgnoreCaseAndTagsName(@Param("title") String titleValue, @Param("tag_name") String tagName, Sort sort);
    Page<Blog> findBlogsByTitleContainingIgnoreCaseAndTagsName(@Param("title") String titleValue, @Param("tag_name") String tagName, Pageable pageable);
}
