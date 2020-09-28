/*******
* index.js file - routes
********/ 

const express = require("express");
const router = express();

router.use("/token", require("./token.route"));
router.use("/user", require("./users.route"));
router.use("/users", require("./users.route"));
router.use("/product", require("./products.route"));
router.use("/products", require("./products.route"));
router.use("/order", require("./orders.route"));
router.use("/orders", require("./orders.route"));
router.use("/review", require("./reviews.route"));
router.use("/reviews", require("./reviews.route"));
router.use("/image", require("./images.route"));
router.use("/images", require("./images.route"));

module.exports = router;