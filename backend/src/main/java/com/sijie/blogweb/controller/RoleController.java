package com.sijie.blogweb.controller;

import com.google.common.base.MoreObjects;
import com.sijie.blogweb.helper.RoleHelper;
import com.sijie.blogweb.model.Role;
import com.sijie.blogweb.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/roles")
public class RoleController {
    private static Logger logger = LoggerFactory.getLogger(RoleController.class);
    private static Integer DEFAULT_PAGE_SIZE = 10;

    private RoleRepository roleRepository;
    private RoleHelper roleHelper;

    @Autowired
    public RoleController(RoleRepository roleRepository,
                          RoleHelper roleHelper) {
        this.roleRepository = roleRepository;
        this.roleHelper = roleHelper;
    }

    @PostMapping("")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Role createNewRole(@RequestBody Role inputRole) {
        logger.info("Start createNewRole");

        Role newRole = roleHelper.validateAndBuildNewRole(inputRole);
        newRole = roleRepository.save(newRole);

        logger.info("Create a new role " + newRole);
        return newRole;
    }

    @GetMapping(value = "")
    @Transactional(readOnly = true)
    public Page<Role> getAllRoles(@RequestParam(name = "page", required = false) Integer page,
                                  @RequestParam(name = "size", required = false) Integer size) {
        logger.info("Start getAllRoles");

        page = MoreObjects.firstNonNull(page, 0);
        size = MoreObjects.firstNonNull(size, DEFAULT_PAGE_SIZE);

        return roleRepository.findAll(PageRequest.of(page, size));
    }

    @PutMapping("")
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public Role updateRole(@RequestBody Role inputRole) {
        logger.info("Start updateRole");

        Role updatedRole = roleHelper.validateAndUpdateRole(inputRole);
        updatedRole = roleRepository.save(updatedRole);

        logger.info("Update role " + updatedRole);
        return updatedRole;
    }

}
