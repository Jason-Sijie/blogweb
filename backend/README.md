# Spring Boot Web Application

## Install Application

### Setup database

#### MySQL

```
sudo docker run --name blogwebmysql -dp 3306:3306 \ 
    -v=/var/mysql:/var/lib/mysql \ 
    -e MYSQL_ROOT_PASSWORD=123456 \ 
    mysql:latest
```
Init DB Schema
```sql
CREATE SCHEMA blog_web IF NOT EXISTS;
```

#### Redis

```
sudo docker run --name blogwebredis -dp 7000:7000 \
    -v=<project path>/backend/config/redis.conf:/etc/redis/redis.conf \
    -v=/var/redis:/data \
    redis:latest \ 
    redis-server /etc/redis/redis.conf
```

### Start the server

The Server has two profiles `dev` and `test`. 
- `dev` profile has the same environment as production. It requires MySQL and Redis DB setup. 
- `test` profile has a minimal environment set up to test the server application's basic correctness.
It uses H2 in memory DB so that we do not have to set up any DB.
  - We can run `./mvnw test -Ptest` to test the basic service logic, but not covering Data Sources. 
  - This `test` profile provides a quick env setup for the CI github action.

#### Run on native host

```
# Run on dev profile: MySQL & Redis
./mvnw spring-boot:run -Pdev

# Run on test profile: H2
./mvnw spring-boot:run -Ptest
```

#### Run in Container

```
# Build jar package
# dev profile
./mvnw package -Pdev
# test profile
./mvnw package -Ptest

# unpack jar
mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

# Build docker image
sudo docker build -t <name> .

# Run image
sudo docker run -dp 9000:9000 <name>
```

#### Initialize Admin user of Blog Web Application

set environment variable for the Admin user.
```shell
export BLOG_WEB_ADMIN_USERNAME="admin"
export BLOG_WEB_ADMIN_PASSWORD="password" 
```
- After setting up these two env variables, start the server with either native maven or docker, the application will create this admin user
  during application setup.
- And then you can apply this Admin user credential to login on Blog Web App through `/login` url. The jwt token will have all access to ALL APIs. 


## API Documentation

### User
Role:
- `ADMIN`
- `GUEST`

### Authentication
- URL: `/login`
- Method: POST
- Content-Type: `application/json`
- Body: `{"username": "", "password": "}`

### Blog
- GET
- CREATE
- UPDATE

### Category
- GET
- CREATE
- UPDATE

### Role
- GET
- CREATE
- UPDATE
