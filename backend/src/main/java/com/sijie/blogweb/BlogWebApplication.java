package com.sijie.blogweb;

import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import java.util.Arrays;

@SpringBootApplication
public class BlogWebApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(BlogWebApplication.class, args);
	}

}
