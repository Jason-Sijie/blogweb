package com.sijie.blogweb.repository.redis;

import com.sijie.blogweb.model.Profile;

public interface ProfileRepository {
    public void setProfile(Profile profile);
    public Profile getProfile(String userId);
}
