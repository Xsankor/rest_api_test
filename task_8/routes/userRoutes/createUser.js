const sqlData = require("../../sql_data");

module.exports = (request, response) => {
    let body = ""

    request.on("data", chank => {
        body += chank;
    });

    request.on("end", async () => {
        const parsedBody = new URLSearchParams(body);
        const dataFromBody = Object.fromEntries(parsedBody);

        if (dataFromBody.name && dataFromBody.age) {
            const user = await sqlData.addUser({ ...dataFromBody });
            response.setHeader("Content-Type", "applications/json");
            if (user) {
                response.writeHead(200);
                response.end(JSON.stringify(user));
            } else {
                response.writeHead(404);
                response.end(JSON.stringify("User not finded"));
            }
        }
    });
};