package com.sijie.blogweb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.base.Objects;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(schema = "blog_web", name = "priviledge")
public class Privilege {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name", length = 32, nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "privileges")
    @JsonIgnore
    private Set<Role> roles;

    @Override
    public int hashCode() {
        return Objects.hashCode(id, name);
    }
}
