package com.sijie.blogweb.helper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class RedisTransactionHelper {

    private final StringRedisTemplate stringRedisTemplate;

    @Autowired
    RedisTransactionHelper(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    public void discardRedisTransaction() {
        stringRedisTemplate.discard();
    }

    public void startRedisTransaction() {
        stringRedisTemplate.multi();
    }

}
