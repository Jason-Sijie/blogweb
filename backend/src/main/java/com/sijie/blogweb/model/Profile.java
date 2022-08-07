package com.sijie.blogweb.model;

import lombok.Data;

import java.util.List;

@Data
public class Profile {
    private Long userId;
    private String name;
    private String aboutMe;
    private String email;
    private List<ProfileLink> links;
    private Long totalViews;
    private Long totalLikes;
}
