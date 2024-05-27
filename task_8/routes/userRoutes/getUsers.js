const sqlData = require("../../sql_data");

module.exports = async (request, response) => {
    const user = await sqlData.getUsers();

    response.setHeader("Content-Type", "applications/json");
    if (user) {
        response.writeHead(200);
        response.end(JSON.stringify(user));
    } else {
        response.writeHead(404);
        response.end(JSON.stringify("Users is empty"));
    }
};