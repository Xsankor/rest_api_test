const express = require("express");
const app = express();


const sqlBase = require("../../db");

module.exports = (request, response) => {
    app.use(express.json());
    let body = "";

    request.on("data", chank => {
        body += chank;
    });

    request.on("end", async () => {
        const bodyData = request.body;
        console.log(bodyData);
        const parsedBody = new URLSearchParams(body);
        const dataFromBody = Object.fromEntries(parsedBody);
        const user = await sqlBase.createUser(dataFromBody);
        if (user) {
            response.status(200).send(user);
        } else {
            response.status(404).send({ message: "ERROR" });
        }
    });
}
