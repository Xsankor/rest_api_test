const express = require("express");
const app = express.Router();

const listUsers = require("./listUsers");
const createUser = require("./createUser");
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser");
const getUserById = require("./getUserById");

app.get("/", listUsers);
app.post("/", createUser);
app.put("/users/", updateUser);
app.delete("/users/", deleteUser);
app.get("/users/", getUserById);

app.use((request, response) => {
    response.status(404).send("Wrong route");
});

module.exports = app;