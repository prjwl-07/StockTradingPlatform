const express = require("express");
const router = express.Router();

const {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist
} = require("../controllers/watchlistController");
const authMiddleware = require("../middleware/authMiddleware");

// get all the watchlist
router.get("/", authMiddleware, getWatchlist);
// add particular element in the watchlist
router.post("/", authMiddleware, addToWatchlist);
// delete particular watchlist
router.delete("/:symbol", authMiddleware, removeFromWatchlist);

module.exports = router;
