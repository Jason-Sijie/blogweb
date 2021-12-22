package com.sijie.blogweb.repository;

import com.sijie.blogweb.model.Privilege;
import com.sijie.blogweb.model.Role;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivilegeRepository extends PagingAndSortingRepository<Privilege, Long> {
    Privilege findByName(@Param("name") String name);
}
