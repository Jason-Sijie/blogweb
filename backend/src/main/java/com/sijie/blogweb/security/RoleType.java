package com.sijie.blogweb.security;

public enum RoleType {
    GUEST("GUEST"),
    ADMIN("ADMIN");

    private String name;
    RoleType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
