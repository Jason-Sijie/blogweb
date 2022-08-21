package com.sijie.blogweb.repository.redis;

import com.sijie.blogweb.model.Profile;

public interface ProfileRepository {
    public void setProfileContent(Profile profile);
    public void setProfileAvatar(Long userId, byte[] source);
    public Profile getProfileContent(Long userId);
    public byte[] getProfileAvatar(Long userId);
}
