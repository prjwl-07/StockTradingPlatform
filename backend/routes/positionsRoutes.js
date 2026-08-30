const express = require("express");
const router = express.Router();
const { PositionsModel } = require("../model/PositionsModel");
const authMiddleware = require("../middleware/authMiddleware");


router.get("/", authMiddleware, async (req, res) => {
  const allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

module.exports = router;
