package com.sijie.blogweb.repository.redis.transaction;

import org.springframework.core.annotation.AliasFor;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RedisTransaction {
    @AliasFor("value")
    public RedisTransactionType type() default RedisTransactionType.ReadOnly;

    @AliasFor("type")
    public RedisTransactionType value() default RedisTransactionType.ReadOnly;
}
