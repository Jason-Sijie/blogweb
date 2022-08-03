package com.sijie.blogweb.repository;

import com.sijie.blogweb.model.Blog;
import com.sijie.blogweb.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import javax.persistence.Tuple;
import java.util.List;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
    User findByUsername(@Param("username") String username);
    User findByUid(@Param("uid") String uid);

    @Query(value = "select B.* " +
            "from blog_like BL inner join blog B on BL.blog_id = B.id " +
            "where user_id = :user_id", nativeQuery = true)
    List<Tuple> findLikedBlogsByUserId(@Param("user_id") Long userId);
}
