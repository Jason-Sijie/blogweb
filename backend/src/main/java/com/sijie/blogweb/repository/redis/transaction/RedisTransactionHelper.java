package com.sijie.blogweb.repository.redis.transaction;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class RedisTransactionHelper {
    private static final Logger logger = LoggerFactory.getLogger(RedisTransactionHelper.class);
    public static final String REDIS_TRANSACTION_CONTEXT_KEY = "REDIS_TRANSACTION_CONTEXT";

    private final StringRedisTemplate stringRedisTemplate;

    @Autowired
    RedisTransactionHelper(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    public void discardRedisTransaction() {
        logger.info("Discard current redis transaction");
        stringRedisTemplate.discard();
    }

    public void startRedisTransaction() {
        logger.info("Start a new redis transaction");
        stringRedisTemplate.multi();
    }

}
