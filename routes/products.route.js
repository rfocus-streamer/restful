/*******
* products.route.js file - routes
********/ 

const express = require("express");
const { productsController } = require("../controllers");
const { auth } = require("../services");
const app = express();

app.post("/", auth.authorize(), productsController.addProduct);
app.patch("/:id", auth.authorize(), productsController.updateProductData);
app.delete("/:id", auth.authorize(), productsController.deleteProductById);
app.get("/", auth.authorize(), productsController.getAllProducts);
app.get("/:id", auth.authorize(), productsController.getProductId);
app.get("/category/:category", auth.authorize(), productsController.getProductCategory);

module.exports = app;