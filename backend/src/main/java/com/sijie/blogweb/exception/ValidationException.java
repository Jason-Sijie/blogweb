package com.sijie.blogweb.exception;

public class ValidationException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public ValidationException() {
        super();
    }
    public ValidationException(String message) {
        super(message);
    }
}
