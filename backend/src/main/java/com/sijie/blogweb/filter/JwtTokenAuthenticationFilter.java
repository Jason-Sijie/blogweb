package com.sijie.blogweb.filter;

import com.sijie.blogweb.exception.InvalidJwtAuthenticationException;
import com.sijie.blogweb.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Reference: https://www.cnblogs.com/larrydpk/p/14939748.html
 */

public class JwtTokenAuthenticationFilter extends GenericFilterBean {

    private JwtTokenProvider jwtTokenProvider;

    public JwtTokenAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        try {
            String token = jwtTokenProvider.resolveToken(request);
            if (token != null && jwtTokenProvider.validateToken(token)) {
                Authentication auth = jwtTokenProvider.getAuthentication(token);

                if (auth != null) {
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        } catch (InvalidJwtAuthenticationException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("Invalid token");
            response.getWriter().flush();
            return;
        }

        filterChain.doFilter(request, response);
    }
}
