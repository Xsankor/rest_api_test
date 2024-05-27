const sqlData = require("../../sql_data");

module.exports = async (request, response) => {
    const id = parseInt(request.url.split("id=")[1]);
    const user = await sqlData.getUserByID(id);

    response.setHeader("Content-Type", "applications/json");
    if (user) {
        response.writeHead(200);
        response.end(JSON.stringify(user));
    } else {
        response.writeHead(404);
        response.end(JSON.stringify({ message: "User not found. Sorry..." }));
    }
};