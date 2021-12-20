# Spring Boot Web Server

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

