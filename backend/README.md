# Spring Backend

## Install

### MySQL on Docker

```
docker run --name blogwebmysql -dp 3306:3306 \
    -v=/var/mysql:/var/lib/mysql \
    -e MYSQL_ROOT_PASSWORD=123456 \
    mysql:latest
```
- We mount local `/var/mysql` directory to store DB data. Please make sure that you created this folder and *docker* usergroup has access to it. 

We have to manually create the database `blog_web`. Please run this SQL:
```sql
CREATE SCHEMA blog_web IF NOT EXISTS;
```

### Redis on Redis

```
docker run --name blogwebredis -dp 7000:7000 \
    -v=<project path>/backend/config/redis.conf:/etc/redis/redis.conf \
    -v=/var/redis:/data \
    redis:latest \
    redis-server /etc/redis/redis.conf
```
- Redis config file is in `/backend/config/redis.conf`. 
- We mount local `/var/redis` directory to store DB data. Please make sure that you created this folder and *docker* usergroup has access to it. 

##  Start Spring Server

### Profiles
The Server has two profiles `dev` and `prod`. 
- `dev` profile has configurations for local stack setup. It requires local MySQL and Redis DB. 
- `prod` profile is used for AWS EKS kubernetes environment only. 
It uses H2 in memory DB so that we do not have to set up any DB.

### Run on native host

```
# Run dev stack
./mvnw spring-boot:run -Pdev
```

### Run in Container

```
# Build jar package
# dev profile
./mvnw package -Pdev

# unpack jar
mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

# Build docker image
docker build -t <name> .

# Run server on port 9001
docker run -dp 9001:9001 <name>
```

### Run unit tests
Sorry that we do not have unit tests for all components currently, only some trivial tests. To run unit tests 
```
./mvnw test -Pdev 
```



### Initialize Admin user on your local stack

set environment variable for the Admin user.
```shell
export BLOG_WEB_ADMIN_USERNAME="admin"
export BLOG_WEB_ADMIN_PASSWORD="password" 
```
- After setting up these two env variables, start the server with either native maven or docker, the application will create this admin user with **ADMIN** Role. (Full Access To **All** Backend APIs)
- And then you can apply this Admin user credential to login on Blog Web App through `/login` . 


## APIs
The backend APIs follow RESTful style, integrating HTTP operations to perform operations on backend resources. (Note: It is not a standard RESTFul API. The response does not have links to other available actions.)

### JWT Token

```
# login
POST /login
- request body: JSON object {
  "username": (str), not null
  "password": (str), not null
}
- response: JSON object {
  token: (str), 
  type: (str),
  expire: (num)
}
```

Later when you make request as a logged in user,  you should attach your token in your request header. 
```
{
  headers: {
    Authorization: type + ' ' + token
  }
}
```

### Blog
```
# Create blog
POST /blogs 
- request body: JSON object {
  "title": (str), not null
  "description": (str), not null
  "content": (str),
  tags: [
    {
      "name": (str),
    }
  ]
}
- resposne: new Blog object in JSON
```

```
# Update blog, only update provided fields
PUT /blogs/{id}
- request body: JSON object {
  "title": (str), 
  "description": (str), 
  "content": (str),
  tags: [
    {
      "name": (str),
    }
  ]
}
- resposne: updated Blog object in JSON
```

```
# Update blog, only update provided fields
PUT /blogs/{id}
- request body: JSON object {
  "title": (str), 
  "description": (str), 
  "content": (str),
  tags: [
    {
      "name": (str),
    }
  ]
}
- resposne: updated Blog object in JSON
```

```
# Delete blog
PUT /blogs/{id}
- request body: None
- resposne: success message
```

```
# Get Blogs (does not include blog content)
GET /blogs
- request params: 
  - authorId: num     // get blogs written by the author
  - tagNames: [str]   // get blogs with tags filtering
  - title: str        // get blogs with Title containing certain string
  - page: num         // page number 
  - size: num         // page size
  - sorts: [str]      // sort the blogs by given properties
    - valid str: likes | views | gmtCreate | gmtUpdate
  - directions: [str]     // propert sort directions. The order must be consistent with 'sorts'. 
    - valid str: ASC | DESC
- reponse: one page of blogs 

# Get Blog Detail (include blog content)
GET /blogs/{id}
- request params: None
- response: result Blog in JSON
```

```
# Like a blog
PUT /blogs/{id}/like
- request body: None
- response: success message

# Unlike a blog
PUT /blogs/{id}/unlike
- request body: None
- response: success message

# Is Blog liked by the user
GET /blogs/{id}/isLiked
- response: 
  - If the blog is liked by the user: returns Blog in JSON object
  - Else, returns null
```

### User

```
# Create Guest user
POST /users/guest
- request body: JSON {
  "username": (str), not null
  "password": (str), not null
}
- response: created User info in JSON
```

```
# Get User liked blogs
GET /{id}/likedBlogs
- request param
  - page: num
  - size: num
- response: a page of liked blogs
```

other APIs can be found in `UserController.java` file. 

### Profile
```
# Create User Profile
POST /users/profiles
- request body: JSON {
  name: (str), 
  aboutMe: (str),
  email: (str),
  links: [
    {
      "name": (str),
      "href": (str)
    }
  ]
} 
- response: Created Profile in JSON
```

```
# Update User Profile
PUT /users/{id}/profiles
- request body: JSON {
  name: (str), 
  aboutMe: (str),
  email: (str),
  links: [
    {
      "name": (str),
      "href": (str)
    }
  ]
} 
- response: Updatad Profile in JSON
```

```
# Upload User Profile Avatar
POST /users/profiles/avatar
- request body: byte array of an image in JPEG or PNG
- response: success message
```

```
# Get profile data
GET users/{id}/profiles
- request param: None
- resposne: Profile in JSON

# Get profile avatar
GET users/{id}/profiles/avatar
- request param: None
- resposne: Avatar image in byte array
```

### Others

other APIs can be found in `com.sijie.blogweb.controlelr.*` file. 

## Spring Security Config
We uses Spring Security to manage web security. The config can be found in `com.sijie.blogweb.config.WebSecurityConfigurerAdapter` class

### JWT Filter

We have two custom JWT Filters to support JWT Login and Authentication. 
1. `com.sijie.blogweb.filter.JwtLoginFilter` captures request to `/login` URL and try to validate the `username` and `password` in the request body. If it matches with any user within our `com.sijie.blogweb.security.CustomUserDetailsService`, then it returns the JWT token. Otherwise, it fails the request with error. 
2. `com.sijie.blogweb.filter.JwtTokenAuthenticationFilter` is to authenticate every request based on the JWT token in request header `Authentication`.  If token is valid, then the request will have the corresponding user's auth context. Otherwise, the request does not have any auth context. 

### CSRF

CSRF is disabled. 

### CORS

We have custom CORS configured in the `com.sijie.blogweb.filter.CustomCorsFilter` filter. 

### Role Based Access Control

In `com.sijie.blogweb.security.Authorities`, we have a list of Authorities assigned to different roles. 

For example:
```
Role GUEST has
- BLOG_ALL, CATEGORY_GET, USER_GET
Role ADMIN has
- BLOG_ALL, CATEGORY_ALL, USER_ALL, ROLE_ALL
```

And later on we can control each API access based on Authorities. For example:
```java
@PutMapping(value = "/{id}")
@PreAuthorize("hasAnyAuthority('BLOG_ALL', 'BLOG_UPDATE')")
public Blog updateBlogById(@PathVariable("id") long id, @RequestBody Blog inputBlog) {
  // The logged in user must have either 'BLOG_ALL` or `BLOG_UPDATE` authority
  // otherwise, it will reject the request with access deny
}
```


## ORM support for native SQL query

Spring Data JPA has native SQL query support, but it returns raw `javax.persistence.Tuple`. We have to map these Tuples to Java Objects by our own. 

In `com.sijie.blogweb.repository.TupleWrapper`, we implemented a custom ORM helper class that can map Tuple to any Java Object. 

**Prerequisite**: 
1. Tuple field name must be consistent with the Target Java Class property name. 
   1. Java Class property name must follow **Camel** naming convention
   2. Tuple field name can either
      1. Same as Java Camel name. 
      2. Same value but in **Snake** naming convention 
2. Target Java Class must have Setter and Getter on all properties. 
3. TuppleWrapper only support following data type: `int, long, varchar, date, text`. It does not support complex structure. 

Here is one example use case. 
```Java
@Getter
@Setter
public class Blog {
  @Id
  private Long id;

  @Column(name="create_time")
  private Date createTime;

  @Column(name="title")
  private String title;

  @Column(name="views")
  private Integer views;
}

@Repository
public BlogRepository extends CRUDRepository<Blog> {

  // valid query: snake naming conventions
  @Query(value="select * from blogs", nativeQuery=true)
  public List<Tuple> findAllBlogs();

  // valid query: Camel naming conventions
  @Query(value="select id, createTime, title, views from blogs", nativeQuery=true)
  public List<Tuple> findAllBlogs();

  // invalid query, field name 'titleString' does not match with Java property 'title'
  @Query(value="select create_time, title as titleString from blogs", nativeQuery=true)
  public List<Tuple> findAllBlogs();
}

@Controller
public class BlogController {

  private BlogRepository blogRepository;

  // test api
  public void test() {
    List<Tuple> tuples = blogRepository.findAllBlogs();
    for (Tulpe tuple : tuples) {
      TuppleWrapper wrapper = new TupleWrapper(tuple);
      Blob blog = wrapper.toObject(Blog.class);
    }
  }
}
```