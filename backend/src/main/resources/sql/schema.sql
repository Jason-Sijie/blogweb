CREATE SCHEMA IF NOT EXISTS blog_web;

USE blog_web;

CREATE TABLE IF NOT EXISTS `blog` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `author_id` bigint(20) NOT NULL,
    `bid` varchar(36) NOT NULL,
    `category_id` varchar(36) DEFAULT NULL,
    `description` varchar(1024) NOT NULL,
    `gmt_create` datetime(6) NOT NULL,
    `gmt_update` datetime(6) NOT NULL,
    `likes` bigint(20) NOT NULL,
    `title` varchar(256) NOT NULL,
    `views` bigint(20) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_blog_table_blog_bid` (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `category` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `cid` varchar(36) NOT NULL,
    `description` varchar(256) DEFAULT NULL,
    `gmt_create` datetime(6) NOT NULL,
    `gmt_update` datetime(6) NOT NULL,
    `name` varchar(128) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_category_table_category_cid` (`cid`),
    UNIQUE KEY `UK_category_table_category_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `tag` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `name` varchar(128) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_tag_table_tag_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `user` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `uid` varchar(36) NOT NULL,
    `password` varchar(128) NOT NULL,
    `username` varchar(36) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_user_table_user_username` (`username`),
    UNIQUE KEY `UK_user_table_user_uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `role` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `name` varchar(32) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_role_table_role_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `privilege` (
     `id` bigint(20) NOT NULL AUTO_INCREMENT,
     `name` varchar(32) NOT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `UK_privilege_table_privilege_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Relationship

CREATE TABLE IF NOT EXISTS `blog_tag` (
    `blog_id` bigint(20) NOT NULL,
    `tag_id` bigint(20) NOT NULL,
    PRIMARY KEY (`blog_id`,`tag_id`),
    KEY `FKt7qwebglmm62nfymnl5xwpbws` (`tag_id`),
    CONSTRAINT `FK_blog_tag_table_blog_id` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`),
    CONSTRAINT `FK_blog_tag_table_tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `blog_like` (
    `blog_id` bigint(20) NOT NULL,
    `user_id` bigint(20) NOT NULL,
    PRIMARY KEY (`blog_id`,`user_id`),
    KEY `blog_like_user_id_key` (`user_id`),
    CONSTRAINT `FK_blog_like_table_blog_id` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`),
    CONSTRAINT `FK_blog_like_table_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `user_role` (
    `user_id` bigint(20) NOT NULL,
    `role_id` bigint(20) NOT NULL,
    PRIMARY KEY (`user_id`,`role_id`),
    KEY `FKa68196081fvovjhkek5m97n3y` (`role_id`),
    CONSTRAINT `FK_user_role_table_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `FK_user_role_table_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `role_privilege` (
    `role_id` bigint(20) NOT NULL,
    `privilege_id` bigint(20) NOT NULL,
    PRIMARY KEY (`role_id`,`privilege_id`),
    KEY `FKdkwbrwb5r8h74m1v7dqmhp99c` (`privilege_id`),
    CONSTRAINT `FK_role_privilege_table_privilege_id` FOREIGN KEY (`privilege_id`) REFERENCES `privilege` (`id`),
    CONSTRAINT `FK_role_privilege_table_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;