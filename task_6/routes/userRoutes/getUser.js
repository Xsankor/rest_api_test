const data = require("../../data");
const url = require("url");

module.exports = (request, response) => {
    // const parseURL = url.parse(request.url, true);
    // const path = parseURL.pathname;
    // const id = parseInt(path.split("/")[2]);

    let body = "";

    request.on("data", chank => {
        body += chank;
    });

    request.on("end", () => {
        let id = parseInt(request.url.split("id=")[1]);
        
        response.setHeader("Content-Type", "applications/json");
        if (id) {
            let user = data.getUserByID(id);
            if (user) {
                response.writeHead(200);
                response.end(JSON.stringify(user));
            } else {
                response.writeHead(404);
                response.end(JSON.stringify({ message: "User not found. Sorry..." }));
            }
        } else {
            response.writeHead(404);
            response.end(JSON.stringify({ message: "Wrong ID" }));
        }
    });
}