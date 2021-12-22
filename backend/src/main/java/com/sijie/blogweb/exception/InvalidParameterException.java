package com.sijie.blogweb.exception;

public class InvalidParameterException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public InvalidParameterException() {
        super();
    }
    public InvalidParameterException(String message) {
        super(message);
    }
}
