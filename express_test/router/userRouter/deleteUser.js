const sqlBase = require("../../db");

module.exports = (request, response) => {
    const id = parseInt(request.query.id);
    const isSuccess = sqlBase.deleteUser(id);
    if (isSuccess) {
        response.status(200).send("Success");
    } else {
        response.status(404).send("Unsuccess");
    }
};