const backend = {
    host: "http://localhost:",
    port: "9001",
}

export const api = {
    blogWeb: {
        baseUrl: backend.host + backend.port,
        blog: backend.host + backend.port + "/blogs",
        category: backend.host + backend.port + "/categories",
        user: backend.host + backend.port + "/users",
        login: backend.host + backend.port + "/login",
        register: backend.host + backend.port + "/users/guest",
        self: backend.host + backend.port + "/users/self"
    }
};

export const website = {
    name: "MarkItDown"
}

export const setting = {
    pageSize: 4,
    tokenTTLInMS: 7200000
}

