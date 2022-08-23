package com.sijie.blogweb.repository.redis;

public interface BlogContentRepository {
    String setBlogContent(String bid, String content);
    String getBlogContent(String bid);
    void deleteBlogContent(String bid);
}
