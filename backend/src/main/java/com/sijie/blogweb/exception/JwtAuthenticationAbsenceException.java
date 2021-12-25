package com.sijie.blogweb.exception;

import org.springframework.security.core.AuthenticationException;

public class JwtAuthenticationAbsenceException extends AuthenticationException {
    public JwtAuthenticationAbsenceException(String message) {
        super(message);
    }
}
