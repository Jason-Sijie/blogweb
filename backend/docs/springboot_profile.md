# Config Different Spring Boot Runtime Environments

## Profile

Spring Boot supports independent configurations for different environments. 
Each environment is managed as a `Profile` in Spring Boot.

### Properties file
Each env has a `application.properties` file and is identified by the file name suffix. 
For example, `application-dev.properties` configures the **dev** environment. 

The `application.properties` is the main config file telling spring boot which env to use. 
```properties
# run dev profile
spring.profiles.active=dev
```

