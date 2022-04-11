package com.sijie.blogweb.aspect;

import com.sijie.blogweb.helper.RedisTransactionHelper;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class RedisTransactionAspect {

    private final RedisTransactionHelper redisTransactionHelper;

    @Autowired
    public RedisTransactionAspect(RedisTransactionHelper redisTransactionHelper) {
        this.redisTransactionHelper = redisTransactionHelper;
    }

    @Before(value= "@annotation(RedisReadTransaction)")
    public void beforeAdvice(JoinPoint joinPoint) {
        redisTransactionHelper.discardRedisTransaction();
    }
}
