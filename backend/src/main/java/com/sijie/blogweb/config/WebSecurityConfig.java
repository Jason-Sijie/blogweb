package com.sijie.blogweb.config;

import com.sijie.blogweb.filter.CustomCorsFilter;
import com.sijie.blogweb.filter.JwtLoginFilter;
import com.sijie.blogweb.filter.JwtTokenAuthenticationFilter;
import com.sijie.blogweb.security.CustomUserDetailsService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private static Logger logger = LoggerFactory.getLogger(WebSecurityConfig.class);

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Value("${jwt.loginUrl}")
    private String jwtLoginUrl;

    @Value("${cors.allowedOrigins}")
    private String[] corsAllowedOrigins;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // disable session
        http.sessionManagement().disable();

        // csrf
        // by default it allows [TRACE, HEAD, GET, OPTIONS]
        http.csrf().disable();
        http.cors();

        // add jwt filters
        http.addFilterAfter(jwtLoginFilter(), LogoutFilter.class)
                .addFilterAfter(jwtTokenAuthenticationFilter(), LogoutFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider());
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    @Bean
    public JwtLoginFilter jwtLoginFilter() throws Exception {
        return new JwtLoginFilter(authenticationManager(), jwtLoginUrl);
    }

    @Bean
    public JwtTokenAuthenticationFilter jwtTokenAuthenticationFilter() {
        return new JwtTokenAuthenticationFilter();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration configuration = new CorsConfiguration();
        logger.info("Allowed Origins: " + corsAllowedOrigins);
        List<String> originList = Arrays.asList(corsAllowedOrigins);
        configuration.setAllowedOrigins(originList);
        configuration.setAllowCredentials(true);
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setMaxAge(3600l);
        source.registerCorsConfiguration("/**", configuration);

        return new CustomCorsFilter(source);
    }
}
