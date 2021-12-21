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