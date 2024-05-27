const url = require("url");

const createUser = require("./createUser");
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser");
const getUser = require("./getUser");
const listUsers = require("./listUsers");

const userRoutes = (request, response) => {
    const parsedURL = url.parse(request.url, true);
    const path = parsedURL.pathname;
    const method = request.method;

    if (path === "/users" && method === "GET") {
        listUsers(request, response);
    } else if (path === "/users" && method === "POST") {
        createUser(request, response);
    } else if (path.startsWith("/users/") && method === "PUT") {
        updateUser(request, response);
    } else if (path.startsWith("/users/") && method === "DELETE") {
        deleteUser(request, response);
    } else if (path.startsWith("/users/") && method === "GET") {
        getUser(request, response);
    } else {
        response.setHeader("Content-Type", "applications/json");
        response.writeHead(404);
        response.end(JSON.stringify({ message: "Router not found" }));
    }
}

module.exports = userRoutes;