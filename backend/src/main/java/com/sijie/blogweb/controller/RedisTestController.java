package com.sijie.blogweb.controller;

import com.sijie.blogweb.repository.BlogContentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class RedisTestController {
    private static Logger logger = LoggerFactory.getLogger(RedisTestController.class);

    @Autowired
    private BlogContentRepository blogContentRepository;

    @RequestMapping("/test/redis")
    @Transactional
    public Map<String, String> testRedisSetAndGet(@RequestParam("key") String key, @RequestParam("value") String value) {
        logger.info("Start testRedisSetAndGet");

        String actualKey = blogContentRepository.setBlogContent(key, value);
        String result = blogContentRepository.getBlogContent(key);

        Map<String, String> resultMap = new HashMap<>();
        resultMap.put("key", actualKey);
        resultMap.put("value", result);
        return resultMap;
    }
}
