# Set Character Encoding by Spring Boot

**Spring MVC** creates `CharacterEncodingFilter` bean to decode and encode the request
and response.

**Spring Boot** autoconfigures the `CharacterEncodingFilter`. If we want to set **characterSet**,
add properties in `application.properties`

```properties
spring.http.encoding.charset=UTF-8
spring.http.encoding.enabled=true
spring.http.encoding.force=true
```
 