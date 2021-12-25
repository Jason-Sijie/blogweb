# Spring Boot Web Server

## Setup database

### MySQL

```
sudo docker run --name blogwebmysql -dp 3306:3306 -v=/var/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 mysql:latest
```

### Redis

```
docker run --name blogwebredis -dp 7000:7000 -v=/var/redis/redis.conf:/etc/redis/redis.conf -v=/var/redis:/data redis:latest redis-server /etc/redis/redis.conf
```


## Start the server

### Run on native host

```
./mvnw spring-boot:run
```

### Run in Container

1. Build the jar package
```
./mvnw package
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

