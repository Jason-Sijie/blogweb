package com.sijie.blogweb.repository;

import com.sijie.blogweb.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    User findByUsername(@Param("username") String username);
    User findByUid(@Param("uid") String uid);
}
