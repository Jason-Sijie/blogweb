package com.sijie.blogweb.exception;

public class InvalidJwtAuthenticationException extends RuntimeException {
    public InvalidJwtAuthenticationException(String message) {
        super(message);
    }
}
