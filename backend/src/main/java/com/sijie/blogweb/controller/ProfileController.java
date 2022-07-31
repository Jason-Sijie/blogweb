package com.sijie.blogweb.controller;

import com.google.common.base.Strings;
import com.sijie.blogweb.exception.InvalidParameterException;
import com.sijie.blogweb.exception.ResourceAlreadyExistsException;
import com.sijie.blogweb.exception.ResourceNotFoundException;
import com.sijie.blogweb.exception.UserCredentialsAbsenceException;
import com.sijie.blogweb.helper.AuthPrincipalHelper;
import com.sijie.blogweb.model.Profile;
import com.sijie.blogweb.repository.redis.ProfileRepository;
import com.sijie.blogweb.repository.redis.transaction.RedisTransaction;
import com.sijie.blogweb.repository.redis.transaction.RedisTransactionType;
import com.sijie.blogweb.security.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(value = "/profiles")
public class ProfileController {
    private static final Logger logger = LoggerFactory.getLogger(ProfileController.class);

    @Autowired
    private ProfileRepository profileRepository;

    @PostMapping(value = "", consumes = {"application/json"})
    @Transactional(isolation = Isolation.SERIALIZABLE)
    @RedisTransaction(type = RedisTransactionType.ReadThenWrite)
    public Profile createNewProfile(@RequestBody Profile profile) {
        CustomUserDetails userDetails = AuthPrincipalHelper.getAuthenticationPrincipal();
        if (userDetails != null) {
            profile.setUserId(userDetails.getUid());
        } else {
            throw new UserCredentialsAbsenceException("You must log in before creating a new profile");
        }

        Profile internalProfile = profileRepository.getProfile(profile.getUserId());
        if (internalProfile != null) {
            throw new ResourceAlreadyExistsException("User " + profile.getUserId() + " already had a profile.");
        }

        validateNewProfile(profile);
        profileRepository.setProfile(profile);
        logger.info("Create new Profile: " + profile);

        return profile;
    }

    @PutMapping(value = "/{id}", consumes = {"application/json"})
    @Transactional(isolation = Isolation.SERIALIZABLE)
    @RedisTransaction(type = RedisTransactionType.ReadThenWrite)
    public Profile updateProfile(@PathVariable("id") String userId, @RequestBody Profile inputProfile) {
        CustomUserDetails userDetails = AuthPrincipalHelper.getAuthenticationPrincipal();
        if (userDetails != null) {
            inputProfile.setUserId(userDetails.getUid());
        } else {
            throw new UserCredentialsAbsenceException("You must be logged in to update your profile");
        }

        Profile internalProfile = profileRepository.getProfile(userId);
        if (internalProfile == null) {
            throw new ResourceNotFoundException("Profile with user id: " + userId + " not found");
        }

        internalProfile = validateAndUpdateProfile(inputProfile, internalProfile);
        profileRepository.setProfile(internalProfile);
        logger.info("Update profile: " + internalProfile);

        return internalProfile;
    }

    @GetMapping(value = "/{id}")
    @Transactional(readOnly = true)
    @RedisTransaction(type = RedisTransactionType.ReadOnly)
    public Profile getProfileById(@PathVariable("id") String userId) {
        Profile profile = profileRepository.getProfile(userId);
        if (profile == null) {
            throw new ResourceNotFoundException("Profile with user id: " + userId + " not found");
        }

        return profile;
    }

    @GetMapping(value = "", params = {"userId"})
    @Transactional(readOnly = true)
    @RedisTransaction(type = RedisTransactionType.ReadOnly)
    public Profile getProfileByUserId(@RequestParam String userId) {
        Profile profile = profileRepository.getProfile(userId);
        if (profile == null) {
            throw new ResourceNotFoundException("Profile with user id: " + userId + " not found");
        }

        return profile;
    }

    private void validateNewProfile(Profile profile) {
        if (Strings.isNullOrEmpty(profile.getName())) {
            throw new InvalidParameterException("Invalid parameter: name can not be empty");
        }
        if (Strings.isNullOrEmpty(profile.getEmail())) {
            throw new InvalidParameterException("Invalid parameter: email can not be empty");
        }
        if (Strings.isNullOrEmpty(profile.getAboutMe())) {
            throw new InvalidParameterException("Invalid parameter: about me can not be empty");
        }
    }

    private Profile validateAndUpdateProfile(Profile inputProfile, Profile internalProfile) {
        if (!Strings.isNullOrEmpty(inputProfile.getName())) {
            internalProfile.setName(inputProfile.getName());
        }
        if (!Strings.isNullOrEmpty(inputProfile.getEmail())) {
            internalProfile.setEmail(inputProfile.getEmail());
        }
        if (!Strings.isNullOrEmpty(inputProfile.getAboutMe())) {
            internalProfile.setAboutMe(inputProfile.getAboutMe());
        }
        if (inputProfile.getLinks() != null) {
            internalProfile.setLinks(inputProfile.getLinks());
        }

        validateNewProfile(internalProfile);
        return internalProfile;
    }
}
