package com.sijie.blogweb.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Component
public class BlogContentRepositoryRedisImpl implements BlogContentRepository {
    private static String BLOG_CONTENT_KEY_PREFIX = "blog_content:";

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public String setBlogContent(String bid, String content) {
        bid = BLOG_CONTENT_KEY_PREFIX + bid;
        stringRedisTemplate.opsForValue().set(bid, content);
        return bid;
    }

    @Override
    public String getBlogContent(String bid) throws DataAccessException {
        if (bid.equals("error")) {
            throw new DataAccessResourceFailureException("error");
        }
        bid = BLOG_CONTENT_KEY_PREFIX + bid;
        String result = (String) stringRedisTemplate.opsForValue().get(bid);
        return result;
    }
}
