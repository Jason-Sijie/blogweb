package com.sijie.blogweb.repository;

import com.sijie.blogweb.repository.transaction.redis.RedisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RedisRepository
public class BlogContentRepositoryRedisImpl implements BlogContentRepository {
    private static final String BLOG_CONTENT_KEY_PREFIX = "blog_content:";

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
        return stringRedisTemplate.opsForValue().get(bid);
    }
}
