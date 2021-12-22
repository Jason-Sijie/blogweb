package com.sijie.blogweb.controller;

import com.google.common.base.MoreObjects;
import com.sijie.blogweb.exception.InvalidParameterException;
import com.sijie.blogweb.exception.ResourceAlreadyExistsException;
import com.sijie.blogweb.model.User;
import com.sijie.blogweb.repository.UserRepository;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private static Logger logger = LoggerFactory.getLogger(UserController.class);
    private static Integer DEFAULT_PAGE_SIZE = 20;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/guest")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public User registerGuestUser(@RequestBody User inputUser) {
        logger.info("Start registerGuestUser");

        if (Strings.isEmpty(inputUser.getUsername())) {
            throw new InvalidParameterException("Invalid Parameter: username cannot be empty");
        }
        if (Strings.isEmpty(inputUser.getPassword())) {
            throw new InvalidParameterException("Invalid Parameter: password cannot be empty");
        }
        String username = inputUser.getUsername();
        String password = inputUser.getPassword();

        User internalUser = userRepository.findByUsername(username);
        if (internalUser != null) {
            throw new ResourceAlreadyExistsException("User with username: " + username + " already exists");
        }
        internalUser = new User();
        internalUser.setUsername(username);
        internalUser.setPassword(passwordEncoder.encode(password));

        internalUser = userRepository.save(internalUser);
        logger.info("Create new user with username: " + username);

        User externalUser = new User();
        externalUser.setId(internalUser.getId());
        externalUser.setUsername(internalUser.getUsername());
        externalUser.setRoles(internalUser.getRoles());
        return externalUser;
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
