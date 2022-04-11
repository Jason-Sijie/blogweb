package com.sijie.blogweb.repository.transaction.redis;

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
