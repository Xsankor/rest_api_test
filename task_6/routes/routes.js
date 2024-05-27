const url = require("url");

const userRoutes = require("./userRoutes/userRoutes");

const requestHandler = (request, responce) => {
    const parseURL = url.parse(request.url, true);
    const path = parseURL.pathname;
    
    if (path === "/users" || path.startsWith("/users/")) {
        userRoutes(request, responce);
    } else {
        responce.setHeader("Content-Type", "applications/json");
        responce.writeHead(404);
        responce.end(JSON.stringify({ message: "Route not found" }));
    }
};

module.exports = requestHandler;