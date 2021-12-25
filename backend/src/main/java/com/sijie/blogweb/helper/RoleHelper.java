package com.sijie.blogweb.helper;

import com.sijie.blogweb.exception.InvalidParameterException;
import com.sijie.blogweb.exception.ResourceAlreadyExistsException;
import com.sijie.blogweb.exception.ResourceNotFoundException;
import com.sijie.blogweb.model.Privilege;
import com.sijie.blogweb.model.Role;
import com.sijie.blogweb.repository.PrivilegeRepository;
import com.sijie.blogweb.repository.RoleRepository;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
@Scope(scopeName = ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class RoleHelper {

    private final PrivilegeRepository privilegeRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public RoleHelper(PrivilegeRepository privilegeRepository, RoleRepository roleRepository) {
        this.privilegeRepository = privilegeRepository;
        this.roleRepository = roleRepository;
    }

    public Role validateAndBuildNewRole(Role inputRole) {
        if (Strings.isEmpty(inputRole.getName())) {
            throw new InvalidParameterException("Invalid Parameter: role name can not be empty");
        }
        Role internalRole = roleRepository.findByName(inputRole.getName());
        if (internalRole != null) {
            throw new ResourceAlreadyExistsException("Role with role name: " + inputRole.getName() + " already exists");
        }

        Role newRole = new Role();
        newRole.setName(inputRole.getName());

        Set<Privilege> attachedPrivilege = getAndCreatePrivileges(inputRole.getPrivileges());
        newRole.setPrivileges(attachedPrivilege);

        return newRole;
    }

    public Role validateAndUpdateRole(Role inputRole) {
        if (Strings.isEmpty(inputRole.getName())) {
            throw new InvalidParameterException("Invalid Parameter: role name can not be empty");
        }
        Role internalRole = roleRepository.findByName(inputRole.getName());
        if (internalRole == null) {
            throw new ResourceNotFoundException("Role with role name: " + inputRole.getName() + " not found");
        }

        Role updatedRole = new Role();
        updatedRole.setId(internalRole.getId());
        updatedRole.setName(internalRole.getName());

        Set<Privilege> attachedPrivilege = getAndCreatePrivileges(inputRole.getPrivileges());
        updatedRole.setPrivileges(attachedPrivilege);

        return updatedRole;
    }

    private Set<Privilege> getAndCreatePrivileges(Set<Privilege> privileges) {
        Set<Privilege> resultPrivileges = new HashSet<>();
        for (Privilege externalPrivilege : privileges) {
            if (Strings.isNotEmpty(externalPrivilege.getName())) {
                Privilege internalPrivilege = privilegeRepository.findByName(externalPrivilege.getName());
                if (internalPrivilege == null) {
                    // create new privilege
                    internalPrivilege = privilegeRepository.save(externalPrivilege);
                }

                resultPrivileges.add(internalPrivilege);
            }
        }

        return resultPrivileges;
    }
}
