const data = require("../../data");

module.exports = (request, response) => {
    let body = "";

    request.on("data", chunk => {
        body += chunk;
    });

    request.on("end", () => {
        const id = parseInt(request.url.split("id=")[1]);
        const parsedBody = new URLSearchParams(body);
        const dataFromBody = Object.fromEntries(parsedBody);

        response.setHeader("Content-Type", "applications/json");
        if (id) {
            let user = data.getUserByID(id);
            if (user) {
                user = { ...user, ...dataFromBody };
                data.updateUser(id, user);
                response.writeHead(200);
                response.end(JSON.stringify(user));
            } else {
                response.writeHead(404);
                response.end(JSON.stringify({ message: "User not found. Sorry..." }))
            }
        } else {
            response.writeHead(404);
            response.end(JSON.stringify({ message: "Wrong ID" }));
        }

    });
};