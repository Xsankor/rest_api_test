const sqlBase = require("../../db");

module.exports = (request, response) => {
    let body = "";

    request.on("data", chank => {
        body += chank;
    });

    request.on("end", async () => {
        const id = parseInt(request.query.id);
        const parsedBody = new URLSearchParams(body);
        const dataFromBody = Object.fromEntries(parsedBody);
        let user = await sqlBase.getUserById(id);
        user = { ...user, ...dataFromBody };
        const updateUser = await sqlBase.updateUser(id, user);
        if (updateUser) {
            response.status(200).send(updateUser);
        } else {
            response.status(404).send("ERROR");
        }
    });
};