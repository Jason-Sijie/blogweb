package com.sijie.blogweb.model.request;

import org.springframework.data.domain.Sort.Direction;

import lombok.Getter;
import lombok.Setter;

public class SortField {
    @Getter
    @Setter
    private String property;

    @Setter
    private Direction direction;

    public Direction getDirection() {
        return this.direction == null ? Direction.DESC : this.direction; 
    }
}
