# A Simple Blog Web 

## Description
A simple Blog Web that support Markdown content edit and preview. Using Framework:
- Backend server: Spring Boot + JWT Authentication
- Database: MySQL & Redis
- Frontend: React Web + Redux

## Design

### Spring Boot Server

Apply Spring Boot Starter to build a simple Restful API server. Integrate JWT with Spring Security for Authentication and Authorization. 

### Database

Spring Boot Server connects to multiple data sources. One relational DB and One NoSQL DB. 

- MySQL: all information other than "files" 
- Redis: store blog content, dedicated as a file storage. 

### React Web App

Integrate Redux with React Web App to manage the entire states at one central "store". Every React Component consumes a specific part of the global states. And to mutate states, each component can send "action event" to the global store, which would dispatch the action to the corresponding "reducer" to perform the mutating operation. 


## Installation

Environment Setup and service installation are documented in each sub-directory.


