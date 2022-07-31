package com.sijie.blogweb.helper;

import com.sijie.blogweb.security.CustomUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthPrincipalHelper {
    public static CustomUserDetails getAuthenticationPrincipal() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof CustomUserDetails) {
            return (CustomUserDetails) principal;
        } else {
            return null;
        }
    }
}
