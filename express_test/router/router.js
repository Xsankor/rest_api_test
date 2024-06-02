const express = require("express");
const app = express();

const userRouter = require("./userRouter/userRouter");

app.all("/", userRouter);
app.all("/users/", userRouter);

module.exports = app;