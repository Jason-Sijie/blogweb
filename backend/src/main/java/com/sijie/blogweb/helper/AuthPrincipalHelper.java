package com.sijie.blogweb.helper;

import com.sijie.blogweb.security.CustomUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuthPrincipalHelper {
    public static CustomUserDetails getAuthenticationPrincipal() {
        return (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
