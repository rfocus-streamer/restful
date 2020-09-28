/*******
* reviews.route.js file - routes
********/ 

const express = require("express");
const { reviewsController } = require("../controllers");
const { auth } = require("../services");
const app = express();

app.post("/", auth.authorize(), reviewsController.addReview);
app.patch("/:id", auth.authorize(), reviewsController.updateReviewData);
app.delete("/:id", auth.authorize(), reviewsController.deleteReviewById);
app.get("/", auth.authorize(), reviewsController.getAllReviews);
app.get("/:id", auth.authorize(), reviewsController.getReviewId);

module.exports = app;