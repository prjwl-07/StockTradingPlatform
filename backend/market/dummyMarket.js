const stocks = {
  INFY: {
    symbol: "INFY",
    name: "Infosys",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 1555.45,
    price: 1555.45,
  },
  ONGC: {
    symbol: "ONGC",
    name: "Oil and Natural Gas Corporation",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 116.8,
    price: 116.8,
  },
  TCS: {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 3194.8,
    price: 3194.8,
  },
  KPITTECH: {
    symbol: "KPITTECH",
    name: "KPIT Technologies",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 266.45,
    price: 266.45,
  },
  QUICKHEAL: {
    symbol: "QUICKHEAL",
    name: "Quick Heal Technologies",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 308.55,
    price: 308.55,
  },
  WIPRO: {
    symbol: "WIPRO",
    name: "Wipro",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 577.75,
    price: 577.75,
  },
  "M&M": {
    symbol: "M&M",
    name: "Mahindra & Mahindra",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 779.8,
    price: 779.8,
  },
  RELIANCE: {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 2112.4,
    price: 2112.4,
  },
  HUL: {
    symbol: "HUL",
    name: "Hindustan Unilever",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 512.4,
    price: 512.4,
  },
  SBIN: {
    symbol: "SBIN",
    name: "State Bank of India",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 430.2,
    price: 430.2,
  },
  ITC: {
    symbol: "ITC",
    name: "ITC Limited",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 207.9,
    price: 207.9,
  },
  TATAPOWER: {
    symbol: "TATAPOWER",
    name: "Tata Power",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 124.15,
    price: 124.15,
  },
  HDFCBANK: {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 1650,
    price: 1650,
  },

  ICICIBANK: {
    symbol: "ICICIBANK",
    name: "ICICI Bank",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 1250,
    price: 1250,
  },

  AXISBANK: {
    symbol: "AXISBANK",
    name: "Axis Bank",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 1100,
    price: 1100,
  },

  LT: {
    symbol: "LT",
    name: "Larsen & Toubro",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 3600,
    price: 3600,
  },

  BHARTIARTL: {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 1900,
    price: 1900,
  },

  ADANIENT: {
    symbol: "ADANIENT",
    name: "Adani Enterprises",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 2500,
    price: 2500,
  },

  TATASTEEL: {
    symbol: "TATASTEEL",
    name: "Tata Steel",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 170,
    price: 170,
  },

  MARUTI: {
    symbol: "MARUTI",
    name: "Maruti Suzuki",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 14500,
    price: 14500,
  },

  HCLTECH: {
    symbol: "HCLTECH",
    name: "HCL Technologies",
    type: "STOCK",
    exchange: "NSE",
    openingPrice: 1500,
    price: 1500,
  },
  NIFTY50: {
    symbol: "NIFTY50",
    name: "NIFTY 50",
    type: "INDEX",
    exchange: "NSE",
    openingPrice: 24500,
    price: 24500,
  },

  SENSEX: {
    symbol: "SENSEX",
    name: "BSE SENSEX",
    type: "INDEX",
    exchange: "BSE",
    openingPrice: 80500,
    price: 80500,
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

const getAllStocks = () => {
  return Object.values(stocks).map((stock) => {
    const changePercent =
      ((stock.price - stock.openingPrice) / stock.openingPrice) * 100;

    return {
      symbol: stock.symbol,
      name: stock.name,
      type: stock.type,
      exchange: stock.exchange,
      currentPrice: stock.price,
      changePercent: Number(changePercent.toFixed(2)),
    };
  });
};

module.exports = {
  getStocks,
  getStock,
  getAllStocks
};
