package com.sijie.blogweb.repository;

import com.sijie.blogweb.model.Tag;

import java.util.List;
import java.util.Set;

import javax.persistence.Tuple;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends PagingAndSortingRepository<Tag, Long> {
    Tag findByName(@Param("name") String tagName);
    Set<Tag> findTagsByBlogsId(@Param("blog_id") Long blogId);

    @Query(value = "select T.id, T.name " + 
            "from blog_tag B inner join tag T on B.tag_id = T.id " + 
            "group by T.id order by count(*) desc limit :top_k", nativeQuery = true)
    List<Tuple> findTopTagsByBlogNumber(@Param("top_k") Integer topK);

    @Query(value = "select T.id, T.name " + 
            "from blog_tag BT inner join tag T on BT.tag_id = T.id inner join blog as B on BT.blog_id = B.id " + 
            "group by T.id order by sum(B.views) desc limit :top_k", nativeQuery = true)
    List<Tuple> findTopTagsByBlogView(@Param("top_k") Integer topK);

    @Query(value = "select T.id, T.name " + 
        "from blog_tag BT inner join tag T on BT.tag_id = T.id inner join blog as B on BT.blog_id = B.id " + 
        "group by T.id order by sum(B.likes) desc limit :top_k", nativeQuery = true)
    List<Tuple> findTopTagsByBlogLike(@Param("top_k") Integer topK);
}

// select T.id, sum(B.views) from blog_tag BT inner join tag T on BT.tag_id = T.id inner join blog as B on BT.blog_id = B.id group by T.id order by sum(B.views) desc
