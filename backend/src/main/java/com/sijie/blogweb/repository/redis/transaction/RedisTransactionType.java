package com.sijie.blogweb.repository.redis.transaction;

public enum RedisTransactionType {
    ReadOnly("ReadOnly"),
    WriteOnly("WriteOnly"),
    ReadThenWrite("ReadThenWrite");

    private final String type;
    RedisTransactionType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
