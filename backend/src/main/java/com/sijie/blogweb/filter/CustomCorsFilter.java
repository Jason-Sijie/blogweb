package com.sijie.blogweb.filter;

import org.springframework.web.cors.*;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomCorsFilter extends CorsFilter {
    private final CorsConfigurationSource configSource;

    public CustomCorsFilter(CorsConfigurationSource configSource) {
        super(configSource);
        this.configSource = configSource;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        super.doFilterInternal(request, response, filterChain);
    }
}
