package com.sijie.blogweb.aspect;

import com.google.common.collect.Sets;
import com.sijie.blogweb.repository.redis.transaction.RedisTransaction;
import com.sijie.blogweb.repository.redis.transaction.RedisTransactionContext;
import com.sijie.blogweb.repository.redis.transaction.RedisTransactionHelper;
import com.sijie.blogweb.repository.redis.transaction.RedisTransactionType;
import org.apache.logging.log4j.ThreadContext;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Set;

import static com.sijie.blogweb.repository.redis.transaction.RedisTransactionHelper.REDIS_TRANSACTION_CONTEXT_KEY;


/**
 * RedisTemplate shares the JPA transaction manager used by MySQL Database.
 * However, there is an issue with the default Redis transaction behavior.
 * The transaction manager always call multi() at the beginning of each controller method.
 * It causes all the Redis read operations piped to execute at the end of the transaction.
 * In other word, all Redis read operations would return null during the method invocation.
 * Therefore, we add a custom aspect to enhance the Redis transaction management.
 * Now we have three types of Redis transactions defined in 'RedisTransactionType'.
 *   - ReadOnly
 *   - WriteOnly
 *   - ReadThenWrite
 * The reason we only support the 2 phase ReadThenWrite is that once we make write operation, we need
 * to call multi() which would pipe all the remaining operations to execute at the exec(). So we have
 * to perform all the reads before any write.
 * Also, for each redis transaction involved request, we store the Redis transaction context into the
 * thread context, in order to keep track of the current transaction status.
 */
@Aspect
@Component
public class RedisTransactionAspect {
    private static final Set<String> WRITE_OPERATION_PREFIX_SET = Sets.newHashSet("set", "delete");

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

        if (isWriteMethod(method)) {
            String context = ThreadContext.get(REDIS_TRANSACTION_CONTEXT_KEY);
            if (RedisTransactionContext.NEW_TRANSACTION.getContext().equals(context)) {
                redisTransactionHelper.startRedisTransaction();
                ThreadContext.put(REDIS_TRANSACTION_CONTEXT_KEY, RedisTransactionContext.HAS_TRANSACTION.getContext());
            }
        }
    }

    private boolean isWriteMethod(Method method) {
        String methodName = method.getName().toLowerCase();
        for (String prefix : WRITE_OPERATION_PREFIX_SET) {
            if (methodName.startsWith(prefix.toLowerCase())) {
                return true;
            }
        }
        return false;
    }
}
