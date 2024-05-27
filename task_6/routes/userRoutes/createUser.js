const data = require("../../data");

module.exports = (request, responce) => {
    let body = "";

    request.on("data", chunk => {
        body += chunk;
    });

    request.on("end", () => {
        let parsedBody = new URLSearchParams(body);
        let name = parsedBody.get("name");
        let age = parsedBody.get("age");

        responce.setHeader("Content-Type", "applications/json");
        if (name && age) {
            const user = { name, age: parseInt(age) };
            data.addUser(user);
            responce.writeHead(201);
            responce.end(JSON.stringify(user));
        } else {
            responce.writeHead(404);
            responce.end(JSON.stringify({ message: "Name and age are required" }));
        }
    });
}