const sqlData = require("../../sql_data");

module.exports = async (request, response) => {
    const users = await sqlData.getUsers();

    response.setHeader("Content-Type", "applications/json");
    if (users) {
        response.writeHead(200);
        response.end(JSON.stringify(users));
    } else {
        response.writeHead(404);
        response.end(JSON.stringify("Table users not found"));
    }
};