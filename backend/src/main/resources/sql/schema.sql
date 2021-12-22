CREATE SCHEMA IF NOT EXISTS blog_web;

CREATE TABLE IF NOT EXISTS `blog` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `author_id` varchar(200) DEFAULT NULL,
    `bid` varchar(200) NOT NULL,
    `category_id` varchar(200) DEFAULT NULL,
    `content` longtext NOT NULL,
    `content_link` longtext DEFAULT NULL,
    `description` longtext NOT NULL,
    `gmt_create` datetime(6) NOT NULL,
    `gmt_update` datetime(6) NOT NULL,
    `likes` bigint(20) NOT NULL,
    `title` varchar(200) NOT NULL,
    `views` bigint(20) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_blog_bid` (`bid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `category` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `cid` varchar(36) NOT NULL,
    `description` varchar(256) DEFAULT NULL,
    `gmt_create` datetime(6) NOT NULL,
    `gmt_update` datetime(6) NOT NULL,
    `name` varchar(128) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_ar5g592u2i15ow076itdhaq65` (`cid`),
    UNIQUE KEY `UK_46ccwnsi9409t36lurvtyljak` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `tag` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `name` varchar(128) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_1wdpsed5kna2y38hnbgrnhi5b` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `user` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `password` varchar(128) NOT NULL,
    `username` varchar(36) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `role` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `name` varchar(32) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `UK_8sewwnpamngi6b1dwaa88askk` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `privilege` (
     `id` bigint(20) NOT NULL AUTO_INCREMENT,
     `name` varchar(32) NOT NULL,
     PRIMARY KEY (`id`),
     UNIQUE KEY `UK_h7iwbdg4ev8mgvmij76881tx8` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Relationship

CREATE TABLE IF NOT EXISTS `blog_tag` (
    `blog_id` bigint(20) NOT NULL,
    `tag_id` bigint(20) NOT NULL,
    PRIMARY KEY (`blog_id`,`tag_id`),
    KEY `FKt7qwebglmm62nfymnl5xwpbws` (`tag_id`),
    CONSTRAINT `FKd0y9mfvb4wsvn1yi3a9jhsase` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`),
    CONSTRAINT `FKt7qwebglmm62nfymnl5xwpbws` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `user_role` (
    `user_id` bigint(20) NOT NULL,
    `role_id` bigint(20) NOT NULL,
    PRIMARY KEY (`user_id`,`role_id`),
    KEY `FKa68196081fvovjhkek5m97n3y` (`role_id`),
    CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `FKa68196081fvovjhkek5m97n3y` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `role_privilege` (
    `role_id` bigint(20) NOT NULL,
    `privilege_id` bigint(20) NOT NULL,
    PRIMARY KEY (`role_id`,`privilege_id`),
    KEY `FKdkwbrwb5r8h74m1v7dqmhp99c` (`privilege_id`),
    CONSTRAINT `FKdkwbrwb5r8h74m1v7dqmhp99c` FOREIGN KEY (`privilege_id`) REFERENCES `privilege` (`id`),
    CONSTRAINT `FKsykrtrdngu5iexmbti7lu9xa` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;