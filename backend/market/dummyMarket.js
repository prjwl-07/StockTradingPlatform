const stocks = {
  INFY: {
    symbol: "INFY",
    exchange: "NSE",
    openingPrice: 1555.45,
    price: 1555.45,
  },

  ONGC: {
    symbol: "ONGC",
    exchange: "NSE",
    openingPrice: 116.8,
    price: 116.8,
  },

  TCS: {
    symbol: "TCS",
    exchange: "NSE",
    openingPrice: 3194.8,
    price: 3194.8,
  },

  KPITTECH: {
    symbol: "KPITTECH",
    exchange: "NSE",
    openingPrice: 266.45,
    price: 266.45,
  },

  QUICKHEAL: {
    symbol: "QUICKHEAL",
    exchange: "NSE",
    openingPrice: 308.55,
    price: 308.55,
  },

  WIPRO: {
    symbol: "WIPRO",
    exchange: "NSE",
    openingPrice: 577.75,
    price: 577.75,
  },

  "M&M": {
    symbol: "M&M",
    exchange: "NSE",
    openingPrice: 779.8,
    price: 779.8,
  },

  RELIANCE: {
    symbol: "RELIANCE",
    exchange: "NSE",
    openingPrice: 2112.4,
    price: 2112.4,
  },

  HUL: {
    symbol: "HUL",
    exchange: "NSE",
    openingPrice: 512.4,
    price: 512.4,
  },

  SBIN: {
    symbol: "SBIN",
    exchange: "NSE",
    openingPrice: 430.2,
    price: 430.2,
  },

  ITC: {
    symbol: "ITC",
    exchange: "NSE",
    openingPrice: 207.9,
    price: 207.9,
  },

  TATAPOWER: {
    symbol: "TATAPOWER",
    exchange: "NSE",
    openingPrice: 124.15,
    price: 124.15,
  },
};

// Change prices every 2 seconds
const updatePrices = () => {
  Object.values(stocks).forEach((stock) => {
    // Random movement between -0.5% and +0.5%
    const movement = (Math.random() - 0.5) * 1;

    const priceChange = stock.price * (movement / 100);

    stock.price += priceChange;

    stock.price = Number(stock.price.toFixed(2));
  });
};

setInterval(updatePrices, 2000);

// Return requested stocks
const getStocks = (symbols) => {
  return symbols.map((symbol) => {
    const stock = stocks[symbol];

    if (!stock) {
      return {
        symbol,
        found: false,
      };
    }

    // Calculate percentage change from opening price
    const changePercent =
      ((stock.price - stock.openingPrice) / stock.openingPrice) * 100;

    return {
      symbol: stock.symbol,
      exchange: stock.exchange,
      currentPrice: stock.price,
      changePercent: Number(changePercent.toFixed(2)),
      found: true,
    };
  });
};

const getStock = (symbol) => {
  const stock = stocks[symbol];

  if (!stock) {
    return null;
  }

  return {
    symbol: stock.symbol,
    exchange: stock.exchange,
    currentPrice: stock.price,
  };
};

module.exports = {
  getStocks,
  getStock,
};
