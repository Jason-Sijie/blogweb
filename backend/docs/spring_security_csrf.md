# How to defend Cross Origin Attack in Spring Security


## Understand what is Cross Origin attach 
Cross Origin Attach AKA: Cross Site Request Forgery (CSRF)
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

#### What is preflight request?

Browser sends a preflight request on behalf of user before it tries to access a resource
with **mutating** Http Method, such as `POST`, `PUT`, `DELETE`. 
The preflight request is Http request with `OPTIONS` Http Method on the same resource. 