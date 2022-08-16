package com.sijie.blogweb.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.cors.*;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class CustomCorsFilter extends CorsFilter {
    private static Logger logger = LoggerFactory.getLogger(CustomCorsFilter.class);
    private final CorsConfigurationSource configSource;

    public CustomCorsFilter(CorsConfigurationSource configSource) {
        super(configSource);
        this.configSource = configSource;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        CorsConfiguration configuration = configSource.getCorsConfiguration(request);
        
        response.addHeader("Vary", "Access-Control-Request-Method");
        response.addHeader("Vary", "Access-Control-Request-Headers");

        String allowedOrigin = flattenListOfString(configuration.getAllowedOrigins());
        response.addHeader("Access-Control-Allow-Origin", allowedOrigin);
        logger.info("Set Access-Control-Allow-Origin header: " + allowedOrigin);

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.addHeader("Access-Control-Allow-Methods", flattenListOfString(configuration.getAllowedMethods()));
            response.addHeader("Access-Control-Allow-Headers", flattenListOfString(configuration.getAllowedHeaders()));
            response.addHeader("Access-Control-Allow-Credentials", configuration.getAllowCredentials() ? "true" : "false");
            response.addHeader("Access-Control-Max-Age", Long.toString(configuration.getMaxAge()));
            response.setStatus(200);
            response.flushBuffer();
        }
        else {
            filterChain.doFilter(request, response);
        }        
    }

    private String flattenListOfString(List<String> list) {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < list.size(); i++) {
            builder.append(list.get(i));
            if (i < list.size() - 1) {
                builder.append(",");
            }
        }
        return builder.toString();
    }
}
