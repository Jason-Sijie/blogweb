package com.sijie.blogweb.repository.redis;

import com.sijie.blogweb.repository.redis.transaction.RedisRepository;
import org.springframework.dao.DataAccessException;

@RedisRepository
public interface BlogContentRepository {
    String setBlogContent(String bid, String content);
    String getBlogContent(String bid) throws DataAccessException;
}
