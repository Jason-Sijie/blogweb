package com.sijie.blogweb.security.jwt;

import lombok.Data;

@Data
public class JwtToken {
    private String token;
    private String type;
    private long expire;
}
