package com.sijie.blogweb.filter;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sijie.blogweb.exception.handler.ErrorMessage;
import com.sijie.blogweb.model.User;
import com.sijie.blogweb.security.jwt.JwtToken;
import com.sijie.blogweb.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

/**
 * Reference: https://cloud.tencent.com/developer/article/1555599
 */

public class JwtLoginFilter extends AbstractAuthenticationProcessingFilter {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public JwtLoginFilter(AuthenticationManager authenticationManager,
                          String defaultFilterProcessesUrl) {
        super(new AntPathRequestMatcher(defaultFilterProcessesUrl));
        setAuthenticationManager(authenticationManager);
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
        JwtToken jwtToken = new JwtToken();
        jwtToken.setToken(token);
        jwtToken.setType(jwtTokenProvider.getTokenType());
        jwtToken.setExpire(jwtTokenProvider.getTimeToExpireInSecond());

        response.setContentType("application/json;charset=utf-8");
        response.setStatus(HttpStatus.OK.value());
        PrintWriter out = response.getWriter();
        out.write(new ObjectMapper().writeValueAsString(jwtToken));
        out.flush();
        out.close();
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setContentType("application/json;charset=utf-8");
        ErrorMessage message = new ErrorMessage();
        message.setMessage("Login Failed. Invalid username or password");
        message.setStatus(HttpStatus.FORBIDDEN.name());
        message.setDate(new Date());

        response.setStatus(HttpStatus.FORBIDDEN.value());
        PrintWriter out = response.getWriter();
        out.write(new ObjectMapper().writeValueAsString(message));
        out.flush();
        out.close();
    }

}
