const express = require("express");

const router = express.Router();

const {
  getStockQuote,
  getStockQuotes,
  getAllStocks,
  getHistoricalData
} = require("../controllers/marketController");

router.get("/quote/:symbol", getStockQuote);

router.get("/quotes", getStockQuotes);

router.get("/stocks", getAllStocks);

router.get("/history/:symbol", getHistoricalData);

module.exports = router;
