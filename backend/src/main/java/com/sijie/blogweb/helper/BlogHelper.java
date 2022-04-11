package com.sijie.blogweb.helper;

import com.sijie.blogweb.exception.InvalidParameterException;
import com.sijie.blogweb.exception.ResourceNotFoundException;
import com.sijie.blogweb.model.Blog;
import com.sijie.blogweb.model.Category;
import com.sijie.blogweb.model.Tag;
import com.sijie.blogweb.model.User;
import com.sijie.blogweb.repository.CategoryRepository;
import com.sijie.blogweb.repository.TagRepository;
import com.sijie.blogweb.repository.UserRepository;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Scope(scopeName = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class BlogHelper {
    private static final Logger logger = LoggerFactory.getLogger(BlogHelper.class);

    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;

    @Autowired
    public BlogHelper(CategoryRepository categoryRepository, TagRepository tagRepository, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.userRepository = userRepository;
    }

    public Blog validateAndBuildNewBlog(Blog inputBlog) {
        Blog newBlog = new Blog();

        if (Strings.isEmpty(inputBlog.getTitle())) {
            throw new InvalidParameterException("Invalid parameter: title can not be empty");
        }
        if (Strings.isEmpty(inputBlog.getDescription())) {
            throw new InvalidParameterException("Invalid parameter: description can not be empty");
        }
        if (inputBlog.getContent() == null) {
            throw new InvalidParameterException("Invalid parameter: content can not be null");
        }
        newBlog.setTitle(inputBlog.getTitle());
        newBlog.setDescription(inputBlog.getDescription());
        newBlog.setContent(inputBlog.getContent());

        // validate category
        if (Strings.isNotEmpty(inputBlog.getCategoryId())) {
            Category category = categoryRepository.findByCid(inputBlog.getCategoryId());
            if (category == null) {
                throw new ResourceNotFoundException("Category with cid: " + inputBlog.getCategoryId() + " not found");
            }
            newBlog.setCategoryId(inputBlog.getCategoryId());
        } else {
            logger.debug("New blog does not have a category Id");
        }

        // validate author
        String uid = inputBlog.getAuthorId();
        if (Strings.isNotEmpty(uid)) {
            User user = userRepository.findByUid(uid);
            if (user == null) {
                throw new ResourceNotFoundException("User with uid: " + uid + " not found");
            }
            newBlog.setAuthorId(uid);
        } else {
            throw new InvalidParameterException("Invalid parameter: blog's author id cannot be null");
        }

        // attach tags
        if (inputBlog.getTags() != null) {
            newBlog.setTags(translateExternalTagsToInternalTags(inputBlog.getTags()));
        }

        newBlog.setBid(UUID.randomUUID().toString());
        newBlog.setViews(0);
        newBlog.setLikes(0);
        Date now = new Date();
        newBlog.setGmtCreate(now);
        newBlog.setGmtUpdate(now);

        return newBlog;
    }

    public Blog validateAndUpdateBlog(Blog inputBlog, Blog internalBlog) {
        if (inputBlog.getTitle() != null) {
            if (inputBlog.getTitle().isEmpty()) {
                throw new InvalidParameterException("Invalid parameter: blog title can not be empty!");
            }
            internalBlog.setTitle(inputBlog.getTitle());
        }
        if (inputBlog.getDescription() != null) {
            internalBlog.setDescription(inputBlog.getDescription());
        }
        if (inputBlog.getContent() != null) {
            internalBlog.setContent(inputBlog.getContent());
        }

        // update category
        if (Strings.isNotEmpty(inputBlog.getCategoryId())
                && !inputBlog.getCategoryId().equals(internalBlog.getCategoryId())) {
            Category category = categoryRepository.findByCid(inputBlog.getCategoryId());
            if (category == null) {
                throw new ResourceNotFoundException("Category with cid: " + inputBlog.getCategoryId() + " not found");
            }
            internalBlog.setCategoryId(inputBlog.getCategoryId());
        }

        // update tags
        if (inputBlog.getTags() != null) {
            Set<Tag> newTags = translateExternalTagsToInternalTags(inputBlog.getTags());
            internalBlog.setTags(newTags);
        }

        internalBlog.setGmtUpdate(new Date());
        return internalBlog;
    }

    public Set<Tag> getInternalTagsFromTagNames(List<String> tagNames) {
        Set<Tag> internalTags = new HashSet<>();
        for (String tagName : tagNames) {
            if (Strings.isNotEmpty(tagName)) {
                Tag tagInternal = tagRepository.findByName(tagName);
                if (tagInternal != null) {
                    internalTags.add(tagInternal);
                }
            }
        }
        return internalTags;
    }


    private Set<Tag> translateExternalTagsToInternalTags(Set<Tag> externalTags) {
        Set<Tag> internalTags = new HashSet<>();
        for (Tag tagExternal: externalTags) {
            if (Strings.isNotEmpty(tagExternal.getName())) {
                Tag tagInternal = tagRepository.findByName(tagExternal.getName());
                if (tagInternal == null) {
                    // create new tag
                    tagExternal.setBlogs(new HashSet<>());
                    tagInternal = tagRepository.save(tagExternal);
                }
                internalTags.add(tagInternal);
            }
        }
        return internalTags;
    }

}
