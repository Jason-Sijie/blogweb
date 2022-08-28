# Markdown Blog Web 

## Description
A simple **Markdown** Blog website that supports Markdown content edit and preview. It provides each user with a home page to arrange all their blogs with custom **tags**. And then everyone can search all blogs on the website with tags filetering. The functionality of this project is simple. But the backend implementation is robust and extendible for any new features that require 1) Role-based access control, 2) JWT auth, 3) Transaction management on multiple datasources (MySQL and Redis) 4) Spring Data JPA native SQL query ORM support. 

In addition, the project has Kubernetes setup to AWS EKS. It deploys react frontend, spring backend, MySQL and Redis to a k8s cluster with *prod* configuration separate from the *dev* environment config. With k8s cluster, we can easily scale our service components independently and have automatic application health check and replacement. 

Here is a demo website: http://markitdown.jason-sijie.com

## Architecture

Here is the diagram of the production architecture on AWS EKS. 
[![architecture.png](https://i.postimg.cc/fy88Gf0D/Screen-Shot-2022-08-27-at-6-42-01-PM.png)](https://postimg.cc/hQ78xxr5)
- Web frontend: React & Redux
- Backend: Spring Boot, Spring Data JPA, Spring Security, Custom JWT. 
- Data layer: Standalone MySQL and Redis DB.  


## Motivation
Besides developing a Markdown blog website, I took this chance to play around with some popular techniques and frameworks to build and delopy a full-stack web application, even though some are unnecessary for this simple website. For example, you can see that I applied two different types of data source and tried to use a single transaction manager to control transactions on multiple data sources. 

If you are new to the web application full-stack development, this is a great hands-on project for you to learn different aspects of web applications. Moreover, there are non-trivial example components for you to dive deeper into the framework. 

If you are interested, please fork this repo. Detailed docs of each component can be found in this README and README files in the sub-directories 


## Set up

### Local set up

- The backend server and databases set up instructions are in `/backend/README.md`
- The react frontend set up instructions are in `/frontend/README.md`

### Kubernetes set up

The AWS EKS set up instructions are in `/kubernetes/aws_eks_setup.md`

## Components

### Spring Backend

We apply *Spring Boot* to bootstrap a HTTP server with *Spring MVC*, *Spring Security*, *Spring Data JPA*, and *Spring Data Redis*. And it has following supports
- Role-based access control and JWT auth
- Single Transaction Management on both MySQL and Redis data sources
- Custom ORM support for Sprign Data JPA native query. 

Details can be found in `/backend/README.md`


### React APP

We uses *React Bootstrap* components for basic UI and *Redux* for global state management. 

Details can be found in `/frontend/README.md`



## Contributors

This is a personal project owned by [Sijie Yu](https://github.com/Jason-Sijie). 
