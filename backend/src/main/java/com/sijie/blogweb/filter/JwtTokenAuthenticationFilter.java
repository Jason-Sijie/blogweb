package com.sijie.blogweb.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sijie.blogweb.exception.InvalidJwtAuthenticationException;
import com.sijie.blogweb.exception.JwtAuthenticationAbsenceException;
import com.sijie.blogweb.exception.handler.ErrorMessage;
import com.sijie.blogweb.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

/**
 * Reference: https://www.cnblogs.com/larrydpk/p/14939748.html
 */

public class JwtTokenAuthenticationFilter extends GenericFilterBean {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

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
            } else {
                throw new JwtAuthenticationAbsenceException("Jwt authentication absence");
            }
        } catch (AuthenticationException e) {
            ErrorMessage message = new ErrorMessage();
            message.setMessage("Authentication failure: Invalid token");
            message.setStatus(HttpStatus.UNAUTHORIZED.name());
            message.setDate(new Date());

            response.setContentType("application/json");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(new ObjectMapper().writeValueAsString(message));
            response.getWriter().flush();
            return;
        }

        filterChain.doFilter(request, response);
    }
}
