/*******
* token.route.js file - routes
********/ 

const express = require("express");
const { tokenController } = require("../controllers");
const { auth } = require("../services");
const app = express();

app.post("/", auth.createToken(), tokenController);

module.exports = app;