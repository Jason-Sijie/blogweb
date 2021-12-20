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
- The `@RepositoryRestResource` annotation is **not required** by the `spring-boot-starter-data-rest` to create REST API on this
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
import com.sijie.blogweb.model.Blog;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.hateoas.EntityModel;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RepositoryRestController
public class BlogController {

    private final BlogRepository blogRepository;

    @Autowired
    public BlogController(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @RequestMapping(value = "/blog/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getBlogDetail(@PathVariable("id") long id) {
        Optional<Blog> result = blogRepository.findById(id);
        if (result.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Blog resultBlog = blogRepository.findById(id).get();

        // business logic here
        //

        EntityModel<Blog> resource = EntityModel.of(resultBlog);
        resource.add(linkTo(methodOn(BlogController.class).getBlogDetail(resultBlog.getId())).withSelfRel());
        resource.add(linkTo(methodOn(BlogController.class).getBlogs()).withRel("blog"));

        return ResponseEntity.ok(resource);
    }
}
```

- We must use `@RequestMapping()`, not `@GetMapping` nor `PostMapping`
- Must add `@ResponseBody` to all REST APIs. 
- In order to add links to the response body, we wrap up results with `CollectionModel` or `EntityModel`.

#### Return One Item
The previous code example shows how we return one item with related `links`. **HATEOAS** helps to build REST style 
response body with links. 
- Wrap up the result `Blog` with `EntityModel<Blog>`.
- `linkTo()` and `methodOn()` methods are all under `hateoas.server.mvc.WebMvcLinkBuilder` package. 
- `withSelfRel()` adds a **self** link. `withRel("name")` adds a custom name link. 
- Return `NotFound` response by `return ResponseEntity.notFound().build();`, if no blog found for the given id. 

#### Return Collection of Items

```java
import com.sijie.blogweb.model.Blog;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.hateoas.CollectionModel;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RepositoryRestController
public class BlogController {

    private final BlogRepository blogRepository;

    @Autowired
    public BlogController(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @RequestMapping(value = "/blog", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getBlogs() {
        Iterable<Blog> blogs = blogRepository.findAll();

        // add business logic here
        //

        List<EntityModel<Blog>> resources = new ArrayList<>();
        for (Blog blog : blogs) {
            EntityModel<Blog> resource = EntityModel.of(blog);
            resource.add(linkTo(methodOn(BlogController.class).getBlogDetail(blog.getId())).withSelfRel());
            resource.add(linkTo(methodOn(BlogController.class).getBlogs()).withRel("blog"));
            resources.add(resource);
        }

        CollectionModel<EntityModel<Blog>> collection = CollectionModel.of(resources);
        collection.add(linkTo(methodOn(BlogController.class).getBlogs()).withSelfRel());

        return ResponseEntity.ok(collection);
    }
}
```
- Wrap up each resource item into `EntityModel` and the whole collection into `CollectionModel`. 

#### Pageable Result

**Spring Hateaos** applies `PageModel` and `PagedResourceAssembler` classes to automatic builds **pagination links**.
However, we have to **implement concrete classes** of `PageModel` and `PagedResourceAssembler` for **each resource**.
Considering the overhead of learning *HATEAOS*, now we just use the *Spring Data Rest* builtin pagination. We might customize
the pagination if required in the future. 

Reference link: https://howtodoinjava.com/spring5/hateoas/pagination-links/

https://www.computingfacts.com/post/Spring-HATEOAS-Adding-Pagination-Links-To-RESTful-API

