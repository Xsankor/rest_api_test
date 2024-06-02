require("dotenv").config();
const express = require("express");
const app = express();
//const path = require("path");

const requestHandler = require("./router/router");

//const createPath = (page) => path.resolve(__dirname, "pages", `${page}.html`);
//app.use("/", express.static(__dirname + "/pages"));

app.use(requestHandler);

try {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Server listen on port ${PORT}`);
    });
} catch (err) {
    console.log(err);
}