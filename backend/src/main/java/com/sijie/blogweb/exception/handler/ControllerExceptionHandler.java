package com.sijie.blogweb.exception.handler;

import com.sijie.blogweb.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice(basePackages = {"com.sijie.blogweb.controller"})
public class ControllerExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorMessage resourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage();
        message.setMessage(ex.getMessage());
        message.setDate(new Date());
        message.setStatus(HttpStatus.NOT_FOUND.name());
        return message;
    }

    @ExceptionHandler(ResourceAlreadyExistsException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    @ResponseBody
    public ErrorMessage resourceAlreadyExistsException(ResourceAlreadyExistsException ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage();
        message.setMessage(ex.getMessage());
        message.setDate(new Date());
        message.setStatus(HttpStatus.CONFLICT.name());
        return message;
    }

    @ExceptionHandler({InvalidParameterException.class})
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ErrorMessage invalidParameterException(InvalidParameterException ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage();
        message.setMessage(ex.getMessage());
        message.setDate(new Date());
        message.setStatus(HttpStatus.BAD_REQUEST.name());
        return message;
    }

    @ExceptionHandler({UserCredentialsAbsenceException.class, UserUnauthorziedException.class})
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    @ResponseBody
    public ErrorMessage unauthorizedException(AuthenticationException ex, WebRequest request) {
        ErrorMessage message = new ErrorMessage();
        message.setMessage(ex.getMessage());
        message.setDate(new Date());
        message.setStatus(HttpStatus.UNAUTHORIZED.name());
        return message;
    }
}
