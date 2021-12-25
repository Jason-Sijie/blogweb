package com.sijie.blogweb.repository;

import org.springframework.dao.DataAccessException;

public interface BlogContentRepository {
    String setBlogContent(String bid, String content);
    String getBlogContent(String bid) throws DataAccessException;
}
