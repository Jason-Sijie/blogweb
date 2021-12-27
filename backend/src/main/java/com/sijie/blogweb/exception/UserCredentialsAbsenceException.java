package com.sijie.blogweb.exception;

import org.springframework.security.core.AuthenticationException;

public class UserCredentialsAbsenceException extends AuthenticationException {
    public UserCredentialsAbsenceException(String message) {
        super(message);
    }
}
