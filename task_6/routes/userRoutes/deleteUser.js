const data = require("../../data");

module.exports = (request, response) => {
    let body = "";

    request.on("data", chank => {
        body += chank
    });

    request.on("end", () => {
        const id = parseInt(request.url.split("id=")[1]);
        const parsedBody = new URLSearchParams(body);

        response.setHeader("Content-Type", "applications/json");
        if (id) {
            if (data.deleteUser(id)) {
                response.writeHead(204);
                response.end(JSON.stringify({ message: "Success" }));
            } else {
                response.writeHead(404);
                response.end(JSON.stringify({ message: "Failed" }));
            }
        } else {
            response.writeHead(404);
            response.end(JSON.stringify({ message: "Wrong ID" }));
        }
    });
};