const express = require("express");

const router = express.Router();

const {
  getStockQuote,
  getStockQuotes,
  getAllStocks
} = require("../controllers/marketController");

router.get("/quote/:symbol", getStockQuote);

router.get("/quotes", getStockQuotes);

router.get("/stocks", getAllStocks);

module.exports = router;
