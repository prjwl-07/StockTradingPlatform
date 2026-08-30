const express = require("express");

const router = express.Router();

const {
  getStockQuote,
  getStockQuotes,
} = require("../controllers/marketController");

router.get("/quote/:symbol", getStockQuote);

router.get("/quotes", getStockQuotes);

module.exports = router;
