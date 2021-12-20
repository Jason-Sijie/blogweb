package com.sijie.blogweb.exception.handler;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class ErrorMessage implements Serializable {
    private String status;
    private Date date;
    private String message;
}
