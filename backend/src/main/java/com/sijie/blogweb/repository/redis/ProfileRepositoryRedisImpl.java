package com.sijie.blogweb.repository.redis;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sijie.blogweb.model.Profile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RedisRepository
public class ProfileRepositoryRedisImpl implements ProfileRepository{
    private static final Logger logger = LoggerFactory.getLogger(ProfileRepositoryRedisImpl.class);
    private static final String PROFILE_KEY_PREFIX = "profile:";

    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void setProfile(Profile profile) {
        String key = PROFILE_KEY_PREFIX + profile.getUserId();
        try {
            stringRedisTemplate.opsForValue().set(key, objectMapper.writeValueAsString(profile));
        } catch (JsonProcessingException e) {
            logger.error("Failed to parse Profile " + profile + " into json.");
        }
    }

    @Override
    public Profile getProfile(String userId) {
        String key = PROFILE_KEY_PREFIX + userId;
        String profileInJson = stringRedisTemplate.opsForValue().get(key);

        Profile profile = null;
        if (profileInJson != null) {
            try {
                profile = objectMapper.readerFor(Profile.class).readValue(profileInJson);
            } catch (JsonProcessingException e) {
                logger.error("Failed to parse json " + profileInJson + " into Profile object.");
            }
        }
        return profile;
    }
}
