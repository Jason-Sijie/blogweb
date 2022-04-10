package com.sijie.blogweb.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.util.Base64;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtProperties {
    private String secretKey;
    private long validityInMs;
    private String loginUrl;
    private String type;

    public String getSecretKey() {
        return Base64.getEncoder().encodeToString(secretKey.getBytes());
    }
}
