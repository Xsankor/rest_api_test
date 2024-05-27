const url = require("url");

const userRoutes = require("./userRoutes/userRoutes");

const requestHandler = (request, response) => {
    const parseURL = url.parse(request.url, true);
    const path = parseURL.pathname;

    if (path === "/users" || path.startsWith("/users/")) {
        userRoutes(request, response);
    }else{
        response.setHeader("Content-Type", "applications/json");
        response.writeHead(404);
        response.end(JSON.stringify("Router incorrect"));
    }
}

module.exports = requestHandler;