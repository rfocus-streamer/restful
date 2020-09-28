/*******
* images.route.js file - routes
********/ 

const express = require("express");
const { imagesController } = require("../controllers");
const { auth } = require("../services");
const app = express();

app.post("/", auth.authorize(), imagesController.addImage);
app.patch("/:id", auth.authorize(), imagesController.updateImageData);
app.delete("/:id", auth.authorize(), imagesController.deleteImageById);
app.get("/", auth.authorize(), imagesController.getAllImages);
app.get("/:id", auth.authorize(), imagesController.getImageId);
app.get("/products/:category", auth.authorize(), imagesController.getImageCategory);

module.exports = app;