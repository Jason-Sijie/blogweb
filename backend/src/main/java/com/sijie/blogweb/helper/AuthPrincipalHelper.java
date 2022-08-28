package com.sijie.blogweb.helper;

import com.sijie.blogweb.model.User;
import com.sijie.blogweb.security.CustomUserDetails;
import com.sijie.blogweb.security.Authorities.AuthorityType;

import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthPrincipalHelper {

    public static boolean hasAdminFullAccessPriviledges(CustomUserDetails userDetails) {   
        return !userDetails.getAuthorities()
                    .stream()
                    .filter((GrantedAuthority authority) -> {
                        return authority.getAuthority().equals(AuthorityType.ADMIN_FULL_ACCESS.getValue());
                    })
                    .collect(Collectors.toList())
                    .isEmpty();
    }

    public static CustomUserDetails getAuthenticationPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof CustomUserDetails) {
            return (CustomUserDetails) principal;
        } else {
            return null;
        }
    }
}
