package com.sijie.blogweb.security;

import com.google.common.collect.Sets;
import com.sijie.blogweb.model.Privilege;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class Authorities {

    public static final Set<AuthorityType> GUEST_ROLE_AUTHORITY_TYPES = Collections.unmodifiableSet(Sets.newHashSet(
            AuthorityType.BLOG_ALL, AuthorityType.CATEGORY_GET, AuthorityType.USER_GET
    ));
    public static final Set<AuthorityType> ADMIN_ROLE_AUTHORITY_TYPES = Collections.unmodifiableSet(Sets.newHashSet(
            AuthorityType.BLOG_ALL, AuthorityType.CATEGORY_ALL, AuthorityType.ROLE_ALL, AuthorityType.USER_ALL, AuthorityType.ADMIN_FULL_ACCESS
    ));
    public static Set<Privilege> getPrivilegesOfGivenRoleType(RoleType roleType) {
        switch (roleType) {
            case ADMIN:
                return getPrivilegesOfAdminRole();
            case GUEST:
                return getPrivilegesOfGuestRole();
        }
        return null;
    }
    public static Set<Privilege> getPrivilegesOfGuestRole() {
        return translateAuthorityTypesToPrivileges(GUEST_ROLE_AUTHORITY_TYPES);
    }
    public static Set<Privilege> getPrivilegesOfAdminRole() {
        return translateAuthorityTypesToPrivileges(ADMIN_ROLE_AUTHORITY_TYPES);
    }

    private static Set<Privilege> translateAuthorityTypesToPrivileges(Set<AuthorityType> types) {
        Set<Privilege> privileges = new HashSet<>();
        for (AuthorityType type : types) {
            Privilege privilege = new Privilege();
            privilege.setName(type.getValue());
            privileges.add(privilege);
        }
        return privileges;
    }

    public enum AuthorityType {
        ADMIN_FULL_ACCESS("ADMIN_FULL_ACCESS"),

        BLOG_ALL("BLOG_ALL"),
        BLOG_CREATE("BLOG_CREATE"),
        BLOG_UPDATE("BLOG_UPDATE"),
        BLOG_GET("BLOG_GET"),
        BLOG_DELETE("BLOG_DELETE"),

        CATEGORY_ALL("CATEGORY_ALL"),
        CATEGORY_CREATE("CATEGORY_CREATE"),
        CATEGORY_UPDATE("CATEGORY_UPDATE"),
        CATEGORY_GET("CATEGORY_GET"),
        CATEGORY_DELETE("CATEGORY_DELETE"),

        ROLE_ALL("ROLE_ALL"),
        ROLE_CREATE("ROLE_CREATE"),
        ROLE_UPDATE("ROLE_UPDATE"),
        ROLE_GET("ROLE_GET"),
        ROLE_DELETE("ROLE_DELETE"),

        USER_ALL("USER_ALL"),
        USER_GUEST_CREATE("USER_GUEST_CREATE"),
        USER_ADMIN_CREATE("USER_ADMIN_CREATE"),
        USER_CREATE("USER_CREATE"),
        USER_UPDATE("USER_UPDATE"),
        USER_GET("USER_GET"),
        USER_DELETE("USER_DELETE"),
        ;

        private String value;

        AuthorityType(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
}
