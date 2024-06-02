const sqlBase = require("../../db");

module.exports = async (request, response) => {
    const id = parseInt(request.query.id);
    const user = await sqlBase.getUserById(id);
    if (user) {
        response.status(200).send(user);
    } else {
        response.status(404).send("ERROR");
    }
}