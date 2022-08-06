package com.sijie.blogweb.helper;

import com.sijie.blogweb.exception.ResourceAlreadyExistsException;
import com.sijie.blogweb.model.Role;
import com.sijie.blogweb.model.User;
import com.sijie.blogweb.repository.RoleRepository;
import com.sijie.blogweb.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Component
@Scope(scopeName = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class UserHelper {
    private static final Logger logger = LoggerFactory.getLogger(UserHelper.class);

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public UserHelper(PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User validateAndBuildNewUser(User inputUser, Set<String> roles) {
        ResourceFormatValidator.validateUsername(inputUser.getUsername());
        ResourceFormatValidator.validatePassword(inputUser.getPassword());
        String username = inputUser.getUsername();
        String password = inputUser.getPassword();

        User internalUser = userRepository.findByUsername(username);
        if (internalUser != null) {
            throw new ResourceAlreadyExistsException("User with username: " + username + " already exists");
        }
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setUid(UUID.randomUUID().toString());

        Set<Role> attachedRoles = new HashSet<>();
        for (String roleName: roles) {
            Role internalRole = roleRepository.findByName(roleName);
            if (internalRole != null) {
                attachedRoles.add(internalRole);
            } else {
                logger.info("Cannot attach " + roleName + " role to user. Because " + roleName + " role does not exist");
            }
        }
        newUser.setRoles(attachedRoles);
        return newUser;
    }

    public User toExternalUser(User internalUser) {
        User externalUser = new User();
        externalUser.setId(internalUser.getId());
        externalUser.setUid(internalUser.getUid());
        externalUser.setUsername(internalUser.getUsername());
        return externalUser;
    }

    public User toExternalUserDetails(User internalUser) {
        User externalUser = new User();
        externalUser.setId(internalUser.getId());
        externalUser.setUid(internalUser.getUid());
        externalUser.setUsername(internalUser.getUsername());
        externalUser.setRoles(internalUser.getRoles());
        return externalUser;
    }
}
