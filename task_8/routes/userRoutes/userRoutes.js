const url = require("url");

const listUsers = require("./listUsers");
const createUser = require("./createUser");
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser");
const getUserByID = require("./getUserById");

const userRoutes = (request, response) => {
    const parseURL = url.parse(request.url, true);
    const path = parseURL.pathname;
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
        getUserByID(request, response);
    } else {
        response.setHeader("Content-Type", "applications/json");
        response.writeHead(404);
        response.end(JSON.stringify("Route is wrong"));
    }
}

module.exports = userRoutes;