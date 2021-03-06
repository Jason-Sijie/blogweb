package com.sijie.blogweb.repository.redis.transaction;

public enum RedisTransactionContext {
    NO_TRANSACTION("NoTransaction"),
    HAS_TRANSACTION("HasTransaction"),
    NEW_TRANSACTION("NewTransaction");

    private String context;
    RedisTransactionContext(String context) {
        this.context = context;
    }

    public String getContext() {
        return context;
    }
}
