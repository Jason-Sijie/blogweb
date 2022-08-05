const blogWeb = {
    host: "http://localhost:",
    port: "9001",
}

export const api = {
    blogWeb: {
        baseUrl: blogWeb.host + blogWeb.port,
        blog: blogWeb.host + blogWeb.port + "/blogs",
        category: blogWeb.host + blogWeb.port + "/categories",
        user: blogWeb.host + blogWeb.port + "/users",
        login: blogWeb.host + blogWeb.port + "/login",
        self: blogWeb.host + blogWeb.port + "/users/self"
    }
};

export const setting = {
    pageSize: 4
}

