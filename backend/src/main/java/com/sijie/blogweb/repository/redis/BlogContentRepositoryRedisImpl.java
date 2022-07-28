package com.sijie.blogweb.repository.redis;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RedisRepository
public class BlogContentRepositoryRedisImpl implements BlogContentRepository {
    private static final String BLOG_KEY_PREFIX = "blog:";
    private static final String CONTENT_KEY = "content";

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public String setBlogContent(String bid, String content) {
        String blogKey = BLOG_KEY_PREFIX + bid;
        stringRedisTemplate.opsForHash().put(blogKey, CONTENT_KEY, content);
        return blogKey;
    }

    @Override
    public String getBlogContent(String bid) throws DataAccessException {
        if (bid.equals("error")) {
            throw new DataAccessResourceFailureException("error");
        }
        String blogKey = BLOG_KEY_PREFIX + bid;
        return (String) stringRedisTemplate.opsForHash().get(blogKey, CONTENT_KEY);
    }
}