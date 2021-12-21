package com.sijie.blogweb.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(schema = "blog_web", name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    // business logic id
    @Column(name = "cid", length = 36, nullable = false, unique = true)
    private String cid;

    @Column(name = "name", length = 128, nullable = false, unique = true)
    private String name;

    // longtext
    @Column(name = "description", length = 256, nullable = true)
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "gmt_create", nullable = false)
    private Date gmtCreate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "gmt_update", nullable = false)
    private Date gmtUpdate;
}
