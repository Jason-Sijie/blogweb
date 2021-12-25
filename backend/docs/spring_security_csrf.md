# How to configure CORS in Spring Security


## Understand what is Cross Site attach
https://www.baeldung.com/spring-security-csrf

## Configure CORS & CSRF in Spring Security

CORS is **DIFFERENT** from CSRF!!
```java
http.csrf().disable();
http.cors();
```

By default, the CSRF protection is enabled by Spring Security. 

### CORS
https://www.baeldung.com/spring-security-cors-preflight
