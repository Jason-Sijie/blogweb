package com.sijie.blogweb.repository.redis;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Strings;
import com.sijie.blogweb.model.Profile;

import java.nio.charset.StandardCharsets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RedisRepository
public class ProfileRepositoryRedisImpl implements ProfileRepository{
    private static final Logger logger = LoggerFactory.getLogger(ProfileRepositoryRedisImpl.class);
    private static final String PROFILE_KEY_PREFIX = "profile:";
    private static final String CONTENT_FIELD = "content";
    private static final String AVATAR_FIELD = "avatar";

    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    private ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void setProfileContent(Profile profile) {
        String key = PROFILE_KEY_PREFIX + profile.getUserId();
        try {
            stringRedisTemplate.opsForHash().put(key, CONTENT_FIELD, objectMapper.writeValueAsString(profile));
        } catch (JsonProcessingException e) {
            logger.error("Failed to parse Profile " + profile + " into json.");
            throw new DataAccessResourceFailureException("Failed to serialize the profile obejct");
        }
    }

    @Override
    public void setProfileAvatar(Long userId, byte[] source) {
        String key = PROFILE_KEY_PREFIX + userId;
        String encode = new String(source, StandardCharsets.ISO_8859_1);
        stringRedisTemplate.opsForHash().put(key, AVATAR_FIELD, encode);
    }

    @Override
    public Profile getProfileContent(Long userId) {
        String key = PROFILE_KEY_PREFIX + userId;
        String contentInJson = (String) stringRedisTemplate.opsForHash().get(key, CONTENT_FIELD);

        Profile profile = null;
        if (contentInJson != null) {
            try {
                profile = objectMapper.readerFor(Profile.class).readValue(contentInJson);
            } catch (JsonProcessingException e) {
                logger.error("Failed to parse json " + contentInJson + " into Profile object.");
                throw new DataAccessResourceFailureException("Failed to deserialize the profile obejct");
            }
        }
        return profile;
    }

    @Override
    public byte[] getProfileAvatar(Long userId) {
        String key = PROFILE_KEY_PREFIX + userId;
        String encode = (String) stringRedisTemplate.opsForHash().get(key, AVATAR_FIELD);
        if (Strings.isNullOrEmpty(encode)) {
            return null;
        }
        
        byte[] avatar = encode.getBytes(StandardCharsets.ISO_8859_1);
        return avatar;
    }
}
