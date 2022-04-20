package com.sijie.blogweb.controller;

import com.google.common.base.MoreObjects;
import com.sijie.blogweb.exception.InvalidParameterException;
import com.sijie.blogweb.exception.ResourceNotFoundException;
import com.sijie.blogweb.exception.UserCredentialsAbsenceException;
import com.sijie.blogweb.exception.UserUnauthorziedException;
import com.sijie.blogweb.helper.AuthPrincipalHelper;
import com.sijie.blogweb.helper.UserHelper;
import com.sijie.blogweb.model.User;
import com.sijie.blogweb.repository.UserRepository;
import com.sijie.blogweb.security.CustomUserDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {
    private static Logger logger = LoggerFactory.getLogger(UserController.class);
    private static Integer DEFAULT_PAGE_SIZE = 20;

    private final UserRepository userRepository;
    private final UserHelper userHelper;

    @Autowired
    public UserController(UserRepository userRepository,
                          UserHelper userHelper) {
        this.userRepository = userRepository;
        this.userHelper = userHelper;
    }

    @PostMapping("/guest")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public User registerGuestUser(@RequestBody User inputUser) {
        logger.info("Start registerGuestUser");

        Set<String> roles = new HashSet<>();
        roles.add("GUEST");

        User newUser = userHelper.validateAndBuildNewUser(inputUser, roles);
        User internalUser = userRepository.save(newUser);
        logger.info("Create new GUEST user with username: " + internalUser.getUsername());

        return userHelper.toExternalUser(internalUser);
    }

    @PostMapping("/admin")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    @PreAuthorize("hasAnyAuthority('USER_ALL', 'USER_ADMIN_CREATE')")
    public User registerAdminUser(@RequestBody User inputUser) {
        logger.info("Start registerAdminUser");

        Set<String> roles = new HashSet<>();
        roles.add("ADMIN");

        User newUser = userHelper.validateAndBuildNewUser(inputUser, roles);
        User internalUser = userRepository.save(newUser);
        logger.info("Create new ADMIN user with username: " + internalUser.getUsername());

        return userHelper.toExternalUser(internalUser);
    }

    @GetMapping(value = "")
    @Transactional(readOnly = true)
    public Page<User> getAllUsers(@RequestParam(name = "page", required = false) Integer page,
                                  @RequestParam(name = "size", required = false) Integer size) {
        logger.info("Start getAllUsers");

        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        return userRepository.findAll(PageRequest.of(page, size)).map((user) -> {
            user.setPassword(null);
            user.setRoles(null);
            return user;
        });
    }

    @GetMapping(value = "", params = {"id"})
    @Transactional(readOnly = true)
    public User getUserInfoById(@RequestParam(name = "id") Long id) {
        logger.info("Start getUserInfoById");

        User internalUser = userRepository.findById(id).orElse(null);
        if (internalUser == null) {
            throw new ResourceNotFoundException("User " + id + " not found");
        }

        return userHelper.toExternalUser(internalUser);
    }

    @GetMapping(value = "", params = {"username"})
    @Transactional(readOnly = true)
    public User getUserInfoByUsername(@RequestParam(name = "username", required = false) String username) {
        logger.info("Start getUserInfoByUsername");

        User internalUser = userRepository.findByUsername(username);
        if (internalUser == null) {
            throw new ResourceNotFoundException("User " + username + " not found");
        }

        return userHelper.toExternalUser(internalUser);
    }

    @GetMapping(value = "", params = {"uid"})
    @Transactional(readOnly = true)
    public User getUserInfoByUid(@RequestParam(name = "uid", required = false) String uid) {
        logger.info("Start getUserInfoByUid");

        User internalUser = userRepository.findByUid(uid);
        if (internalUser == null) {
            throw new ResourceNotFoundException("User " + uid + " not found");
        }

        return userHelper.toExternalUser(internalUser);
    }

    @GetMapping(value = "/{id}")
    @Transactional(readOnly = true)
    @PreAuthorize("hasAnyAuthority('USER_ALL', 'USER_GET')")
    public User getUserDetailsById(@PathVariable("id") long id) {
        logger.info("Start getUserDetailsById");

        CustomUserDetails userDetails = AuthPrincipalHelper.getAuthenticationPrincipal();
        if (userDetails == null) {
            throw new UserCredentialsAbsenceException("User credentials are required to get user details");
        } else if (userDetails.getId() != id){
            throw new UserUnauthorziedException("Not authorized to get the user details");
        }

        Optional<User> internalUser = userRepository.findById(id);
        if (!internalUser.isPresent()) {
            throw new ResourceNotFoundException("User with id '" + id + "' not found");
        }

        return userHelper.toExternalUserDetails(internalUser.get());
    }

    @GetMapping(value = "/details", params = {"uid"})
    @Transactional(readOnly = true)
    @PreAuthorize("hasAnyAuthority('USER_ALL', 'USER_GET')")
    public User getUserDetailsByUid(@RequestParam("uid") String uid) {
        logger.info("Start getUserInfoByUid");

        CustomUserDetails userDetails = AuthPrincipalHelper.getAuthenticationPrincipal();
        if (userDetails == null) {
            throw new UserCredentialsAbsenceException("User credentials are required to get user details");
        } else if (!userDetails.getUid().equals(uid)){
            throw new UserUnauthorziedException("Not authorized to get the user details");
        }

        User internalUser = userRepository.findByUid(uid);
        if (internalUser == null) {
            throw new ResourceNotFoundException("User with uid '" + uid + "' not found");
        }

        return userHelper.toExternalUser(internalUser);
    }

    @GetMapping(value = "/details", params = {"username"})
    @Transactional(readOnly = true)
    @PreAuthorize("hasAnyAuthority('USER_ALL', 'USER_GET') or principal.username == #username")
    public User getUserDetailsByUsername(@RequestParam("username") String username) {
        logger.info("Start getUserInfoByUsername");

        CustomUserDetails userDetails = AuthPrincipalHelper.getAuthenticationPrincipal();
        if (userDetails == null) {
            throw new UserCredentialsAbsenceException("User credentials are required to get user details");
        } else if (!userDetails.getUsername().equals(username)){
            throw new UserUnauthorziedException("Not authorized to get the user details");
        }

        User internalUser = userRepository.findByUsername(username);
        if (internalUser == null) {
            throw new ResourceNotFoundException("User with username '" + username + "' not found");
        }

        return userHelper.toExternalUserDetails(internalUser);
    }

    @GetMapping(value = "/self")
    @Transactional(readOnly = true)
    @PreAuthorize("hasAnyAuthority('USER_ALL', 'USER_GET')")
    public User getCurrentUserDetails() {
        logger.info("Start getCurrentUserDetails");

        CustomUserDetails userDetails = AuthPrincipalHelper.getAuthenticationPrincipal();
        if (userDetails == null) {
            throw new UserCredentialsAbsenceException("User credentials are required to get current user details");
        }

        User internalUser = userRepository.findByUsername(userDetails.getUsername());
        if (internalUser == null) {
            throw new ResourceNotFoundException("User " + userDetails.getUsername() + " not found");
        }

        return userHelper.toExternalUserDetails(internalUser);
    }
}
