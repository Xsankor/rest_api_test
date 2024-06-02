const sqlBase = require("../../db");

module.exports = async (request, response) => {
    const users = await sqlBase.listUsers();
    if (users) {
        let listUser = "<ul>";
        users.forEach(item => {
            listUser += `<li>${JSON.stringify(item)}</li>`;
        })
        listUser += "</ul>";
        response.status(200).send(listUser);
    } else {
        response.statuss(404).send("ERROR");
    }
};