/*******
* users.route.js file - routes
********/ 

const express = require("express");
const { usersController } = require("../controllers");
const { auth } = require("../services");
const app = express();

app.post("/", auth.authorize(), usersController.addUser);
app.put("/:id", auth.authorize(), usersController.updateUserData);
app.delete("/:id", auth.authorize(), usersController.deleteUserById);
app.get("/", auth.authorize(), usersController.getAllUsers);
app.get("/:id", auth.authorize(), usersController.getUserId);

module.exports = app;