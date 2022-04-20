# Spring Boot Security -- JWT Integration

## Dependencies



## Spring Boot Security

### Custom User Details Service

The `CustomUserDetailsService` allows us to configure our own User Details source of truth. 
A common practice is to store User Details in database and let spring boot to authenticate 
based on it. 

Useful blog: https://blog.csdn.net/NDKHBWH/article/details/100074764

### Spring Security Filters
https://www.marcobehler.com/guides/spring-security

We do not need the `BasicAuthenticationFilter`, the `JwtAuthenticationFilter` is responsible to provide 
user principle for the security context. 

## JWT

- https://cloud.tencent.com/developer/article/1555599
- https://www.cnblogs.com/larrydpk/p/14939748.html

### JWT Filter

We need two **Filters** to process the request with JWT
1. "login" filter to authenticate the username and password. 
2. "token validation" filter to validate the token in the HTTP request. 