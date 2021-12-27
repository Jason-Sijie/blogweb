package com.sijie.blogweb.exception;

import org.springframework.security.core.AuthenticationException;

public class UserUnauthorziedException extends AuthenticationException {
    public UserUnauthorziedException(String message) {
        super(message);
    }
}
