const backendHost = process.env.REACT_APP_BACKEND_URL || "http://localhost"
const backendPort = process.env.REACT_APP_BACKEND_PORT || "9001"
const backend = backendHost + ":" + backendPort

export const api = {
    blogWeb: {
        baseUrl: backend,
        blog: backend + "/blogs",
        tag: backend + "/tags",
        user: backend + "/users",
        login: backend + "/login",
        register: backend + "/users/guest",
        self: backend + "/users/self"
    }
};

export const appConfig = {
    websiteName: "MarkItDown",
    blogListPageSize: parseInt(process.env.REACT_APP_BLOG_LIST_PAGE_SIZE) || 4,
    tokenTTLInMS: parseInt(process.env.REACT_APP_TOKEN_TTL_IN_MS) || 7200000,
    pageStaleTimeInMS: 30 * 60000,
    tokenKey: "MarkItDown_TOKEN" 
}
