package com.sijie.blogweb.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@ConfigurationProperties(prefix = "redis")
@Configuration
public class RedisProperties {
    private String host;
    private int port;
    private String password;
}
