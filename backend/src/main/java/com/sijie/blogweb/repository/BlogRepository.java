package com.sijie.blogweb.repository;

import com.sijie.blogweb.model.Blog;
import com.sijie.blogweb.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface BlogRepository extends PagingAndSortingRepository<Blog, Long> {

    List<Blog> findByTitle(@Param("title") String titleValue);
    Blog findByBid(@Param("bid") String bid);
    Page<Blog> findAllByCategoryId(@Param("category_id") String cid, Pageable pageable);
    Page<Blog> findAllByAuthorId(@Param("author_id") String aid, Pageable pageable);
    Page<Blog> findBlogsByTagsName(@Param("tag_name") String tagName, Pageable pageable);
    List<Blog> findBlogsByTagsName(@Param("tag_name") String tagName);
    List<Blog> findBlogsByAuthorIdAndTagsName(@Param("author_id") String aid, @Param("tag_name") String tagName);
}
