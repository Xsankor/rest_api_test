const sqlData = require("../../sql_data");

module.exports = async (request, response) => {
    let body = "";

    request.on("data", chank => {
        body += chank;
    });

    request.on("end", async () => {
        const id = parseInt(request.url.split("id=")[1]);
        const parsedBody = new URLSearchParams(body);
        const dataFromBody = Object.fromEntries(parsedBody);

        response.setHeader("Content-Type", "applications/json");
        if (id) {
            let user = await sqlData.getUserByID(id);
            if (user) {
                user = {...user, ...dataFromBody};
                user = await sqlData.updateUser(id, user);
                response.writeHead(200);
                response.end(JSON.stringify(user));
            } else {
                response.writeHead(404);
                response.end(JSON.stringify("User not found. Sorry..."));
            }
        } else {
            response.writeHead(404);
            response.end(JSON.stringify({ message: "Wrong ID" }));
        }
    });
};