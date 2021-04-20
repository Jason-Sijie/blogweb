# Set up Spring Data REST

## Dependency
Two main data access packages
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-rest</artifactId>
</dependency>
```

## How to use DATA JPA REST

### Create a Pojo Entity
```java
@Entity
@Data
public class Person {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  private String firstName;
  private String lastName;
}
```
- Use JPA annotation to identify this entity.

### Create Repository Interface
```java
@RepositoryRestResource(collectionResourceRel = "people", path = "people")
public interface PersonRepository extends PagingAndSortingRepository<Person, Long> {

  List<Person> findByLastName(@Param("name") String name);

}
```

The concrete implementation class of this `PersonRepository` is automatically created by **Spring Data JPA**.
- `spring-boot-starter-data-jpa` implements the entire `PersonRepository`.

### Controller
`spring-boot-starter-data-rest` is responsible to creates a collection of **Spring MVC controllers**, **JSON converters**,
and other beans to provide Restful API. All these components are **autoconfigured** by Spring Boot. If we want customized
properties, we can investigate the `RepositoryRestMvcConfiguration` class.

```java
@RepositoryRestResource(collectionResourceRel = "people", path = "people")
```
- The `@RepositoryRestResource` annotation is **not required** for the `spring-boot-starter-data-rest` to create REST API on this
repository.
- It only changes the API path from the default `/persons` to `/people`


## How Spring Data REST works

It adds a `RepositoryRestHandlerMapping` to the list of handler mappings.
All the requests under the registered REST path will only be handled by
`RepositoryRestController`. The original `Controller` and `RestController` do not see
these requests.

### Override Controller Method

Create a Controller class with `@RepositoryRestController` not `@RestController`.
And then override the particular methods.

```java
import org.springframework.data.rest.core.annotation.RepositoryRestResource;import org.springframework.web.bind.annotation.RequestMapping;import org.springframework.web.bind.annotation.RequestMethod;

@RepositoryRestResource
public class PersonController {
    
    @RequestMapping(path = "/people/{id}", method = RequestMethod.GET)
    public String getPeopleDetail() {
        // business logic
        return "result";
    }
}
```