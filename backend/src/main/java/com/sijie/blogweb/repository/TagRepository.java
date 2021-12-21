package com.sijie.blogweb.repository;

import com.sijie.blogweb.model.Tag;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends PagingAndSortingRepository<Tag, Long> {
    Tag findByName(@Param("name") String tagName);
}
