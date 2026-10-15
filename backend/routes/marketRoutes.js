const express = require("express");

const router = express.Router();

const {
  getBharatStockQuote,
  getStockQuotes,
  getAllStocks,
  getHistoricalData,
  getCompanyDetails,
} = require("../controllers/marketController");

router.get("/bharatquote/:symbol", getBharatStockQuote);

router.get("/quote/:symbol", getStockQuotes);

router.get("/quotes", getStockQuotes);

router.get("/stocks", getAllStocks);

router.get("/history/:symbol", getHistoricalData);

router.get("/company/:symbol", getCompanyDetails);

module.exports = router;
