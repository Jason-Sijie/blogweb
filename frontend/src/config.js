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
        jwt: blogWeb.host + blogWeb.port + "/login",
    }
};

