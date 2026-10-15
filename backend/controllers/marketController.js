const {
  getStocks,
  getAllStocks: getAllMarketStocks,
  getAllSymbols,
  initializePrices,
  startPriceUpdates,
} = require("../market/dummyMarket");

const { getCompanyInfo } = require("../market/companyInfo");


// bharatstock api
// for only one stock
const fetchBharatStockQuote = async (symbol) => {
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
    throw new Error(`BharatStock API failed for ${symbol}`);
  }

  return {
    symbol: data.symbol,
    exchange: data.exchange,
    currentPrice: data.latest_price?.close ?? null,
    previousClose: data.latest_price?.prev_close ?? null,
  };
};

// bharatstock api 
// for many stocks
const fetchBharatStockQuotes = async (symbols) => {
  const query = new URLSearchParams({
    symbols: symbols.join(","),
  });

  const response = await fetch(
    `https://bharatstockapi.com/v1/stocks/quotes?${query}`,
    {
      headers: {
        "X-API-Key": process.env.BHARATSTOCK_API_KEY,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch BharatStock batch quotes");
  }

  if (!Array.isArray(data)) {
    throw new Error("Unexpected BharatStock batch response format");
  }

  return data
    .filter((quote) => quote.found && quote.close != null)
    .map((quote) => ({
      symbol: quote.symbol,
      currentPrice: quote.close,
    }));
};


const initializeMarketData = async () => {
  try {
    const symbols = getAllSymbols();

    console.log("Fetching initial market prices from BharatStock...");

    const quotes = await fetchBharatStockQuotes(symbols);

    initializePrices(quotes);

    startPriceUpdates();

    console.log(
      `Market initialized with real prices for ${quotes.length} stocks.`,
    );
  } catch (error) {
    console.error("Market initialization failed:", error.message);
    throw error;
  }
};

const getBharatStockQuote = async (req, res) => {
  try {
    const { symbol } = req.params;

    const quote = await fetchBharatStockQuote(symbol);

    return res.status(200).json(quote);
  } catch (error) {
    console.error("MARKET API ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch market data",
      error: error.message,
    });
  }
};

// to send the dummyMarket data to the frontend
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

// to send all the dummyMarket data to the frontend
const getAllStocks = async (req, res) => {
  try {
    const stocks = getAllMarketStocks();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stocks" });
  }
};

// to get all historical data for the chart by using indianapi
const getHistoricalData = async (req, res) => {
  try {
    const { symbol } = req.params;
    const requestedPeriod = req.query.period;

    if (
      requestedPeriod !== undefined &&
      (typeof requestedPeriod !== "string" || !requestedPeriod.trim())
    ) {
      return res.status(400).json({
        message: "Period must be a non-empty string",
      });
    }

    const period = requestedPeriod?.trim() || "1yr";

    const query = new URLSearchParams({
      stock_name: symbol,
      period,
      filter: "price",
    });

    const response = await fetch(
      `https://stock.indianapi.in/historical_data?${query}`,
      {
        headers: {
          "X-API-Key": process.env.INDIAN_STOCK_MARKET_API,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Failed to fetch historical market data",
        error: data,
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("MARKET API ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch historical market data",
      error: error.message,
    });
  }
};

// to show company Details in stockDetails component
const getCompanyDetails = (req, res) => {
  try {
    const { symbol } = req.params;
    const company = getCompanyInfo(symbol);

    if (!company) {
      return res.status(404).json({
        message: "Company information not found",
      });
    }

    return res.status(200).json({
      symbol: symbol.toUpperCase(),
      ...company,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch company information",
    });
  }
};



module.exports = {
  getBharatStockQuote,
  getStockQuotes,
  getAllStocks,
  getHistoricalData,
  getCompanyDetails,
  initializeMarketData,
};