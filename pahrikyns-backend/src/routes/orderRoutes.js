const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middlewares/authMiddleware");

router.get("/:id", auth, orderController.getUserOrderById);

module.exports = router;
