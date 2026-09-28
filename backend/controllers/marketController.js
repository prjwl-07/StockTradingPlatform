const {
  getStocks,
  getAllStocks: getAllMarketStocks,
} = require("../market/dummyMarket");

const getStockQuote = async (req, res) => {
  try {
    const { symbol } = req.params;

    const response = await fetch(
      `https://bharatstockapi.com/v1/stocks/${encodeURIComponent(symbol)}`,
      {
        headers: {
          "X-API-Key": process.env.BHARATSTOCK_API_KEY,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Failed to fetch market data",
        error: data,
      });
    }

    return res.status(200).json({
      symbol: data.symbol,
      exchange: data.exchange,
      currentPrice: data.latest_price?.close ?? null,
      previousClose: data.latest_price?.prev_close ?? null,
    });
  } catch (error) {
    console.error("MARKET API ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch market data",
      error: error.message,
    });
  }
};

const getStockQuotes = async (req, res) => {
  try {
    const { symbols } = req.query;

    if (!symbols) {
      return res.status(400).json({
        message: "Symbols are required",
      });
    }

    const symbolList = symbols
      .split(",")
      .map((symbol) => symbol.trim().toUpperCase())
      .filter(Boolean);

    if (symbolList.length === 0) {
      return res.status(400).json({
        message: "At least one symbol is required",
      });
    }

    if (symbolList.length > 50) {
      return res.status(400).json({
        message: "Maximum 50 symbols allowed per request",
      });
    }

    const quotes = getStocks(symbolList);

    return res.status(200).json(quotes);
  } catch (error) {
    console.error("MARKET API ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch market data",
      error: error.message,
    });
  }
};

const getAllStocks = async (req, res) => {
  try {
    const stocks = getAllMarketStocks();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stocks" });
  }
};

module.exports = {
  getStockQuote,
  getStockQuotes,
  getAllStocks
};