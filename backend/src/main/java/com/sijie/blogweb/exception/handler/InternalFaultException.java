package com.sijie.blogweb.exception.handler;

public class InternalFaultException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public InternalFaultException() {
        super();
    }
    public InternalFaultException(String message) {
        super(message);
    }
}
