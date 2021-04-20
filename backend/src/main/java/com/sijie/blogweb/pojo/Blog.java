package com.sijie.blogweb.pojo;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "blog", schema = "blogweb")
@Data
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

}
