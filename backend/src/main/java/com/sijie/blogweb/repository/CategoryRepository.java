package com.sijie.blogweb.repository;

import com.sijie.blogweb.model.Category;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends PagingAndSortingRepository<Category, Long> {
    Category findByName(@Param("name") String categoryName);
    Category findByCid(@Param("cid") String cid);
}
