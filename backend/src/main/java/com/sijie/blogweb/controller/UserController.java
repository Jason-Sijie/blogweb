package com.sijie.blogweb.controller;

import com.google.common.base.MoreObjects;
import com.sijie.blogweb.helper.UserHelper;
import com.sijie.blogweb.model.User;
import com.sijie.blogweb.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
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
        logger.info("Create new user with username: " + internalUser.getUsername());

        return userHelper.toExternalUser(internalUser);
    }

    @GetMapping(value = "")
    @Transactional(readOnly = true)
    public Page<User> getAllUsers(@RequestParam(name = "page", required = false) Integer page,
                                  @RequestParam(name = "size", required = false) Integer size) {
        logger.info("Start getAllUsers");

        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        return userRepository.findAll(PageRequest.of(page, size));
    }

}
