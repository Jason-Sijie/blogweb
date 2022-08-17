package com.sijie.blogweb.helper;

import com.sijie.blogweb.exception.ResourceAlreadyExistsException;
import com.sijie.blogweb.model.Blog;
import com.sijie.blogweb.model.Role;
import com.sijie.blogweb.model.Tag;
import com.sijie.blogweb.model.User;
import com.sijie.blogweb.repository.BlogRepository;
import com.sijie.blogweb.repository.RoleRepository;
import com.sijie.blogweb.repository.TagRepository;
import com.sijie.blogweb.repository.TupleWrapper;
import com.sijie.blogweb.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.persistence.Tuple;

@Component
@Scope(scopeName = ConfigurableBeanFactory.SCOPE_SINGLETON)
public class UserHelper {
    private static final Logger logger = LoggerFactory.getLogger(UserHelper.class);

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final TagRepository tagRepository;

    @Autowired
    public UserHelper(PasswordEncoder passwordEncoder, 
                    UserRepository userRepository, 
                    RoleRepository roleRepository, 
                    TagRepository tagRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.tagRepository = tagRepository;
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

    public Page<Blog> getUserLikedBlogs(User internalUser, int page, int size) {
        List<Tuple> tuples = userRepository.findLikedBlogsByUserId(internalUser.getId());
        List<Blog> likedBlogs = new ArrayList<>();
        for (Tuple tuple : tuples) {
            TupleWrapper tupleWrapper = new TupleWrapper(tuple);
            Blog blog = tupleWrapper.toObject(Blog.class);
            if (blog != null) {
                Set<Tag> tags = tagRepository.findTagsByBlogsId(blog.getId());
                blog.setTags(tags);
                likedBlogs.add(blog);
            }
        }

        return generatePageBlogResult(likedBlogs, page, size);
    }

    private Page<Blog> generatePageBlogResult(List<Blog> blogs, int page, int size) {
        List<Blog> pageResult;
        if (page*size < blogs.size()) {
            pageResult = blogs.subList(page*size, Math.min(page*size + size, blogs.size()));
        } else {
            pageResult = Collections.emptyList();
        }

        return new PageImpl<Blog>(pageResult, PageRequest.of(page, size), blogs.size());
    }
}
