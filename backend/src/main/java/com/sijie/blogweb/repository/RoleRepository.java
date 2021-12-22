package com.sijie.blogweb.repository;

import com.sijie.blogweb.model.Role;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends PagingAndSortingRepository<Role, Long> {
    Role findByName(@Param("name") String roleName);
}
