package com.sijie.blogweb.aspect;

import com.sijie.blogweb.repository.redis.transaction.RedisTransaction;
import com.sijie.blogweb.repository.redis.transaction.RedisTransactionContext;
import com.sijie.blogweb.repository.redis.transaction.RedisTransactionHelper;
import com.sijie.blogweb.repository.redis.transaction.RedisTransactionType;
import org.apache.logging.log4j.ThreadContext;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

import static com.sijie.blogweb.repository.redis.transaction.RedisTransactionHelper.REDIS_TRANSACTION_CONTEXT_KEY;

@Aspect
@Component
public class RedisTransactionAspect {
    private static final String WRITE_OPERATION_PREFIX = "set";

    private final RedisTransactionHelper redisTransactionHelper;

    @Autowired
    public RedisTransactionAspect(RedisTransactionHelper redisTransactionHelper) {
        this.redisTransactionHelper = redisTransactionHelper;
    }

    @Before(value= "@annotation(com.sijie.blogweb.repository.redis.transaction.RedisTransaction)")
    public void beforeTransaction(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        RedisTransaction redisTransaction = method.getAnnotation(RedisTransaction.class);
        RedisTransactionType type = redisTransaction.type();

        if (RedisTransactionType.ReadOnly.equals(type)) {
            redisTransactionHelper.discardRedisTransaction();
            ThreadContext.put(REDIS_TRANSACTION_CONTEXT_KEY, RedisTransactionContext.NO_TRANSACTION.getContext());
        } else if (RedisTransactionType.ReadThenWrite.equals(type)) {
            redisTransactionHelper.discardRedisTransaction();
            ThreadContext.put(REDIS_TRANSACTION_CONTEXT_KEY, RedisTransactionContext.NEW_TRANSACTION.getContext());
        } else if (RedisTransactionType.WriteOnly.equals(type)) {
            ThreadContext.put(REDIS_TRANSACTION_CONTEXT_KEY, RedisTransactionContext.HAS_TRANSACTION.getContext());
        }
    }

    @Before(value = "@within(com.sijie.blogweb.repository.redis.RedisRepository)")
    public void beforeRepository(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();

        if (method.getName().startsWith(WRITE_OPERATION_PREFIX)) {
            String context = ThreadContext.get(REDIS_TRANSACTION_CONTEXT_KEY);
            if (RedisTransactionContext.NEW_TRANSACTION.getContext().equals(context)) {
                redisTransactionHelper.startRedisTransaction();
                ThreadContext.put(REDIS_TRANSACTION_CONTEXT_KEY, RedisTransactionContext.HAS_TRANSACTION.getContext());
            }
        }
    }
}
