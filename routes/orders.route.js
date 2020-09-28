/*******
* orders.route.js file - routes
********/ 

const express = require("express");
const { ordersController } = require("../controllers");
const { auth } = require("../services");
const app = express();

app.post("/", auth.authorize(), ordersController.addOrder);
app.patch("/:id", auth.authorize(), ordersController.updateOrderData);
app.delete("/:id", auth.authorize(), ordersController.deleteOrderById);
app.get("/", auth.authorize(), ordersController.getAllOrders);
app.get("/:id", auth.authorize(), ordersController.getOrderId);

module.exports = app;