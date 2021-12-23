package com.sijie.blogweb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "blog", schema = "blog_web")
@Data
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    // business logic id
    @Column(name = "bid", length = 36, nullable = false, unique = true)
    private String bid;

    @Column(name = "title", length = 256, nullable = false)
    private String title;

    // longtext
    @Lob
    @Column(name = "description", nullable = false)
    private String description;

    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "likes", nullable = false)
    private long likes;

    @Column(name = "views", nullable = false)
    private long views;

    @Column(name = "author_id", length = 36, nullable = true)
    private String authorId;

    @Column(name = "category_id", length = 36, nullable = true)
    private String categoryId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "gmt_create", nullable = false)
    private Date gmtCreate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "gmt_update", nullable = false)
    private Date gmtUpdate;

    @ManyToMany
    @JoinTable(
            schema = "blog_web",
            name = "blog_tag",
            joinColumns = @JoinColumn(table = "blog", name = "blog_id"),
            inverseJoinColumns = @JoinColumn(table = "tag", name = "tag_id")
    )
    private Set<Tag> tags;
}
