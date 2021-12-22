package com.sijie.blogweb.filter;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sijie.blogweb.model.User;
import com.sijie.blogweb.security.jwt.JwtTokenProvider;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.log.LogMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.event.InteractiveAuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;

/**
 * Reference: https://cloud.tencent.com/developer/article/1555599
 */

public class JwtLoginFilter extends AbstractAuthenticationProcessingFilter {

    private JwtTokenProvider jwtTokenProvider;

    public JwtLoginFilter(AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider,
                          String defaultFilterProcessesUrl) {
        super(new AntPathRequestMatcher(defaultFilterProcessesUrl));
        setAuthenticationManager(authenticationManager);
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException, ServletException {
        User user;
        try {
            user = new ObjectMapper().readValue(httpServletRequest.getInputStream(), User.class);
        } catch (IOException ex) {
            throw new InternalAuthenticationServiceException("Invalid input format");
        }
        return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        String token = jwtTokenProvider.createToken(authResult.getName(), authResult.getAuthorities());

        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        out.write(token);
        out.flush();
        out.close();
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setContentType("application/json;charset=utf-8");
        PrintWriter out = response.getWriter();
        out.write("Login Failed. Invalid username or password");
        out.flush();
        out.close();
    }

}
