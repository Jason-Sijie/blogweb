package com.sijie.blogweb.repository;

import com.sijie.blogweb.repository.transaction.redis.RedisRepository;
import org.springframework.dao.DataAccessException;

@RedisRepository
public interface BlogContentRepository {
    String setBlogContent(String bid, String content);
    String getBlogContent(String bid) throws DataAccessException;
}
