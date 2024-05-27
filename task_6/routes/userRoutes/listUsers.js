const data = require("../../data");

module.exports = (request, responce) => {
    responce.writeHead(200);
    responce.end(JSON.stringify(data.getUsers()));
}