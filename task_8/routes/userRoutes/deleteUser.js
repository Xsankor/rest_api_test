const sqlData = require("../../sql_data");

module.exports = async (request, response) => {
    const id = parseInt(request.url.split("id=")[1]);

    response.setHeader("Content-Type", "applications/json");
    if(id){
        const isSuccess = await sqlData.deleteUsers(id);

        if(isSuccess){
            response.writeHead(200);
            response.end(JSON.stringify({message : "Success"}));
        }else{
            response.writeHead(404);
            response.end(JSON.stringify("Unsuccess"));
        }
    }else{
        response.writeHead(404);
        response.end(JSON.stringify({message: "Wrong ID"}));
    }
};