package com.sijie.blogweb.controller;

import com.google.common.base.MoreObjects;
import com.google.common.base.Strings;
import com.sijie.blogweb.exception.InvalidParameterException;
import com.sijie.blogweb.exception.ResourceAlreadyExistsException;
import com.sijie.blogweb.exception.ResourceNotFoundException;
import com.sijie.blogweb.model.Category;
import com.sijie.blogweb.repository.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "/categories")
public class CategoryController {
    private static Logger logger = LoggerFactory.getLogger(CategoryController.class);
    private static Integer DEFAULT_PAGE_SIZE = 20;

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @PostMapping(value = "", consumes = {"application/json"})
    @Transactional(isolation = Isolation.SERIALIZABLE)
    @PreAuthorize("hasAnyAuthority('CATEGORY_ALL', 'CATEGORY_CREATE')")
    public Category createNewCategory(@RequestBody Category inputCategory) {
        logger.info("Start createNewCategory");

        if (Strings.isNullOrEmpty(inputCategory.getName())) {
            throw new InvalidParameterException("Invalid parameter: category name can not be empty");
        }
        Category internalCategory = categoryRepository.findByName(inputCategory.getName());
        if (internalCategory != null) {
            throw new ResourceAlreadyExistsException("Category with name: " + inputCategory.getName() + " already exists");
        }

        Date now = new Date();
        inputCategory.setCid(UUID.randomUUID().toString());
        inputCategory.setGmtCreate(now);
        inputCategory.setGmtUpdate(now);

        internalCategory = categoryRepository.save(inputCategory);
        return internalCategory;
    }

    @GetMapping(name = "")
    @Transactional(readOnly = true)
    public Page<Category> getAllCategories(@RequestParam(name = "page", required = false) Integer page,
                                           @RequestParam(name = "size", required = false) Integer size) {
        logger.info("Start getAllCategories");

        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        return categoryRepository.findAll(PageRequest.of(page, size));
    }

    @GetMapping(value = "/{id}")
    @Transactional(readOnly = true)
    public Category getCategoryDetailById(@PathVariable("id") long id) {
        logger.info("Start getCategoryDetailById");

        Optional<Category> result = categoryRepository.findById(id);
        if (!result.isPresent()) {
            throw new ResourceNotFoundException("Category not found with id: " + id);
        }

        return result.get();
    }

    @GetMapping(value = "/", params = {"cid"})
    @Transactional(readOnly = true)
    public Category getCategoryDetailByCid(@RequestParam String cid) {
        logger.info("Start getCategoryDetailByCid");

        Category result = categoryRepository.findByCid(cid);
        if (result == null) {
            throw new ResourceNotFoundException("Category not found with cid: " + cid);
        }
        return result;
    }

    @PostMapping(value = "/{id}", consumes = {"application/json"})
    @Transactional(isolation = Isolation.SERIALIZABLE)
    @PreAuthorize("hasAnyAuthority('CATEGORY_ALL', 'CATEGORY_UPDATE')")
    public Category updateCategory(@PathVariable("id") long id, @RequestBody Category inputCategory) {
        logger.info("Start updateCategory");

        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (!categoryOptional.isPresent()) {
            throw new ResourceNotFoundException("Category with id: " + id + " not found");
        }
        Category internalCategory = categoryOptional.get();

        if (inputCategory.getDescription() != null
                && !inputCategory.getDescription().equals(internalCategory.getDescription())) {
            internalCategory.setDescription(inputCategory.getDescription());
        }

        internalCategory.setGmtUpdate(new Date());

        internalCategory = categoryRepository.save(internalCategory);
        logger.info("Update Category " + internalCategory);
        return internalCategory;
    }
}
