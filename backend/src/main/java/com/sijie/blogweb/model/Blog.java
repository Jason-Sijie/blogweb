package com.sijie.blogweb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "blog", schema = "blog_web")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // business logic id
    @Column(name = "bid", length = 36, nullable = false, unique = true)
    private String bid;

    @Column(name = "title", length = 256, nullable = false)
    private String title;

    @Column(name = "description", length = 1024, nullable = false)
    private String description;

    @Transient
    private String content;

    @Column(name = "likes", nullable = false)
    private Long likes;

    @Column(name = "views", nullable = false)
    private Long views;

    @Column(name = "author_id", nullable = false)
    private Long authorId;

    @Column(name = "category_id", length = 36, nullable = true)
    private String categoryId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "gmt_create", nullable = false)
    private Date gmtCreate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "gmt_update", nullable = false)
    private Date gmtUpdate;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            schema = "blog_web",
            name = "blog_tag",
            joinColumns = @JoinColumn(table = "blog", name = "blog_id"),
            inverseJoinColumns = @JoinColumn(table = "tag", name = "tag_id")
    )
    private Set<Tag> tags;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            schema = "blog_web",
            name = "blog_like",
            joinColumns = @JoinColumn(table = "blog", name = "blog_id"),
            inverseJoinColumns = @JoinColumn(table = "user", name = "user_id")
    )
    @JsonIgnore
    private Set<User> likedUsers;

}
