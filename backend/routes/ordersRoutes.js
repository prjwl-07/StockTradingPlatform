const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createOrder, getOrders } = require("../controllers/ordersController");

router.post(
  "/",
  authMiddleware,
  createOrder,
);

router.get("/", authMiddleware, getOrders);

module.exports = router;
