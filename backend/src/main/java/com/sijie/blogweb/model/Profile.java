package com.sijie.blogweb.model;

import lombok.Data;

import java.util.Map;

@Data
public class Profile {
    private Long userId;
    private String name;
    private String aboutMe;
    private String email;
    private Map<String, String> links;
    private Long totalViews;
    private Long totalLikes;
}
