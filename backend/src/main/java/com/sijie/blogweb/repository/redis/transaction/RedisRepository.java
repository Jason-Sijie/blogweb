package com.sijie.blogweb.repository.redis.transaction;

import java.lang.annotation.*;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface RedisRepository {
}
