package com.sijie.blogweb.model.response;

import lombok.Data;

@Data
public class BasicHttpResponse {
    Integer status;
    String message;
}
