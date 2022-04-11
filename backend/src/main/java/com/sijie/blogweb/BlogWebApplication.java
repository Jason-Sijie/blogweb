package com.sijie.blogweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy(proxyTargetClass=true)
public class BlogWebApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(BlogWebApplication.class, args);
	}

}
