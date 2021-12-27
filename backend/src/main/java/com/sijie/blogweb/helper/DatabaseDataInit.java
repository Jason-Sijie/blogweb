package com.sijie.blogweb.helper;

import com.google.common.collect.Sets;
import com.sijie.blogweb.model.Privilege;
import com.sijie.blogweb.model.Role;
import com.sijie.blogweb.model.User;
import com.sijie.blogweb.repository.PrivilegeRepository;
import com.sijie.blogweb.repository.RoleRepository;
import com.sijie.blogweb.repository.UserRepository;
import com.sijie.blogweb.security.Authorities;
import com.sijie.blogweb.security.RoleType;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Component
public class DatabaseDataInit {
    private static final Logger logger = LoggerFactory.getLogger(DatabaseDataInit.class);
    private static final String BLOG_WEB_ADMIN_USERNAME = "BLOG_WEB_ADMIN_USERNAME";
    private static final String BLOG_WEB_ADMIN_PASSWORD = "BLOG_WEB_ADMIN_PASSWORD";

    private final RoleRepository roleRepository;
    private final PrivilegeRepository privilegeRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final Environment environment;

    @Autowired
    public DatabaseDataInit(RoleRepository roleRepository,
                            PrivilegeRepository privilegeRepository,
                            UserRepository userRepository,
                            PasswordEncoder passwordEncoder,
                            Environment environment) {
        this.roleRepository = roleRepository;
        this.privilegeRepository = privilegeRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.environment = environment;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initAuthorityData() {
        initPrivileges(Authorities.getPrivilegesOfAdminRole());
        initPrivileges(Authorities.getPrivilegesOfGuestRole());

        initRole(RoleType.ADMIN);
        initRole(RoleType.GUEST);

        initAdminUser();
    }

    private void initRole(RoleType roleType) {
        Role internalRole = roleRepository.findByName(roleType.getName());
        if (internalRole == null) {
            Role role = new Role();
            role.setName(roleType.getName());
            role.setPrivileges(getInternalPrivileges(Authorities.getPrivilegesOfGivenRoleType(roleType)));
            internalRole = roleRepository.save(role);
            logger.info("Init " + roleType.getName() + " role: " + internalRole);
        } else {
            internalRole.setPrivileges(getInternalPrivileges(Authorities.getPrivilegesOfGivenRoleType(roleType)));
            internalRole = roleRepository.save(internalRole);
            logger.info("Updated " + roleType.getName() + " role with these privileges: " + internalRole.getPrivileges());
        }
    }

    private void initPrivileges(Set<Privilege> privilegeSet) {
        for (Privilege privilege : privilegeSet) {
            Privilege internalPrivilege = privilegeRepository.findByName(privilege.getName());
            if (internalPrivilege == null) {
                internalPrivilege = privilegeRepository.save(privilege);
                logger.info("Init " + privilege.getName() + " privilege " + internalPrivilege);
            } else {
                logger.info(privilege.getName() + " privilege already exists. skip init.");
            }
        }
    }

    private Set<Privilege> getInternalPrivileges(Set<Privilege> externalPrivileges) {
        Set<Privilege> internalPrivileges = new HashSet<>();
        for (Privilege externalPrivilege : externalPrivileges) {
            Privilege internalPrivilege = privilegeRepository.findByName(externalPrivilege.getName());
            if (internalPrivilege == null) {
                internalPrivilege = privilegeRepository.save(externalPrivilege);
            }
            internalPrivileges.add(internalPrivilege);
        }

        return internalPrivileges;
    }

    private void initAdminUser() {
        String username = environment.getProperty(BLOG_WEB_ADMIN_USERNAME);
        String password = environment.getProperty(BLOG_WEB_ADMIN_PASSWORD);

        if (Strings.isNotEmpty(username) && Strings.isNotEmpty(password)) {
            User internalAdmin = userRepository.findByUsername(username);
            if (internalAdmin == null) {
                User newAdmin = new User();
                newAdmin.setUsername(username);
                newAdmin.setPassword(passwordEncoder.encode(password));
                newAdmin.setUid(UUID.randomUUID().toString());

                Role adminRole = roleRepository.findByName(RoleType.ADMIN.getName());
                newAdmin.setRoles(Sets.newHashSet(adminRole));

                internalAdmin = userRepository.save(newAdmin);
                logger.info("Create a new Admin user: " + internalAdmin);
            } else if (!passwordEncoder.matches(password, internalAdmin.getPassword())) {
                internalAdmin.setPassword(passwordEncoder.encode(password));
                logger.info("Update the existing Admin user: " + username + " with new password");
            }
        } else {
            logger.info("BLOG_WEB_ADMIN_USERNAME or BLOG_WEB_ADMIN_PASSWORD does not exist. Skip admin user init. ");
        }
    }

}
