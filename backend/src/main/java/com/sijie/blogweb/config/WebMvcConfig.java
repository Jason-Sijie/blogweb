package com.sijie.blogweb.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport {

    @Override
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        // map requests /images/** to classpath:/images/
        registry.addResourceHandler("/images/**").addResourceLocations("classpath:/images/");

//        super.addResourceHandlers(registry);
    }
}
