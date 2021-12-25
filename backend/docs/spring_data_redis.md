# Spring Boot Integrate with Redis

## Transaction

### @Transactional 

`RedisTemplate` does not manage Spring transactions. So to apply `@Transactional`, we have to apply 
the JDBC TransactionManager instance. And in this way, Redis-transactions are batch-oriented. 
- Read-only commands, such as KEYS, are piped to a fresh (non-thread-bound) RedisConnection to allow reads. 
- Write commands are queued by RedisTemplate and applied upon commit.

So in a transaction, you may not read your own writes. For example, in this case

```java
import org.springframework.transaction.annotation.Transactional;

public class Foo {
    private RedisTemplate redisTemplate;
    
    @Transactional
    public String testTransaction(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
        String result = redisTemplate.opsForValue().get(key);
        
        // result is null
        // because the previous write were not executed until commit
        System.out.println(result);
    }

}
```

### SessionCallBack

If you want to read your own writes in a transaction, you can apply `SessionCallback()`, which ensures that all operations
in the transaction are performed with the **same** connection. 

```java
//execute a transaction
class Foo{
    public void testTransaction() {
        List<Object> txResults = (List<Object>) redisTemplate.execute(new SessionCallback<List<Object>>() {
            public List<Object> execute(RedisOperations operations) throws DataAccessException {
                operations.multi();
                operations.opsForValue().set("key", "value1");
                operations.opsForValue().get("key");

                // This will contain the results of all operations in the transaction
                return operations.exec();
            }
        });
        // the read operation can read value "value1"
        System.out.println(txResults.get(1));
    }
}
```