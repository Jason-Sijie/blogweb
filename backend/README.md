# Spring Boot Web Server

## Setup database

### MySQL

```
sudo docker run --name blogwebmysql -dp 3306:3306 \ 
    -v=/var/mysql:/var/lib/mysql \ 
    -e MYSQL_ROOT_PASSWORD=123456 \ 
    mysql:latest
```

### Redis

```
docker run --name blogwebredis -dp 7000:7000 \
    -v=<project path>/backend/config/redis.conf:/etc/redis/redis.conf \
    -v=/var/redis:/data \
    redis:latest \ 
    redis-server /etc/redis/redis.conf
```

### Initialize Admin user of Blog Web Application 

set environment variable for the Admin user. 
```shell
export BLOG_WEB_ADMIN_USERNAME="admin"
export BLOG_WEB_ADMIN_PASSWORD="password" 
```
- After setting up these two env variables, start the server with either native maven or docker, the application will create this admin user
during application setup. 
- And then you can apply this Admin user credential to login on Blog Web App through `/login` url. The jwt token will have all access to ALL APIs. 



## Start the server

### Run on native host

```
# Run on dev profile: MySQL & Redis
./mvnw spring-boot:run -Pdev

# Run on test profile: H2
./mvnw spring-boot:run -Ptest
```

### Run in Container

1. Build the jar package
```
# Build jar package
# dev profile
./mvnw package -Pdev
# test profile
./mvnw package -Ptest

# unpack jar
mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)
```

2. Build Docker image
```
sudo docker build -t <name> .
```

3. Run the image
```
sudo docker run -dp 9000:9000 <name>
```

