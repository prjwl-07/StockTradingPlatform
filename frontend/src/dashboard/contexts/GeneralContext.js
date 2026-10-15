import React, { useState, useEffect } from "react";
import axios from "axios";
import BuyActionWindow from "../features/trading/BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode = "BUY") => {},
  closeBuyWindow: () => {},
  orderMode: "BUY",
  recentOrders: [],
  onOrderSuccess: (order) => {},
  showToast: (message, type = "success") => {},
  ordersRefresh: 0,
  refreshOrders: () => {},
  holdingsRefresh: 0,
  refreshHoldings: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");
  const [balance, setBalance] = useState(0);
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [toast, setToast] = useState(null);
  const [ordersRefresh, setOrdersRefresh] = useState(0);
  const [holdingsRefresh, setHoldingsRefresh] = useState(0);
  const [marketStocks, setMarketStocks] = useState([]);
  const [marketPrices, setMarketPrices] = useState({});
  const [marketLoading, setMarketLoading] = useState(true);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleOpenBuyWindow = (uid, mode = "BUY") => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setOrderMode(mode);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  const handleOrderSuccess = (order) => {
    const newOrder = {
      ...order,
      time: new Date().toLocaleTimeString("en-US", { hour12: false }),
    };

    setRecentOrders((previousOrders) => [newOrder, ...previousOrders]);
    showToast(
      `${order.mode} order for ${order.qty} qty of ${order.name} submitted successfully!`,
    );
  };

  const refreshOrders = () => setOrdersRefresh((previous) => previous + 1);
  const refreshHoldings = () =>
    setHoldingsRefresh((previous) => previous + 1);

  useEffect(() => {
    const fetchMarketStocks = async () => {
      try {
        const response = await axios.get("http://localhost:3002/market/stocks");
        const stocks = response.data;
        const prices = {};

        stocks.forEach((stock) => {
          prices[stock.symbol] = {
            currentPrice: stock.currentPrice,
            changePercent: stock.changePercent,
          };
        });

        setMarketStocks(stocks);
        setMarketPrices(prices);
        setMarketLoading(false);
      } catch (error) {
        console.error(
          "Failed to fetch market stocks:",
          error.response?.data || error.message,
        );
        setMarketLoading(false);
      }
    };

    fetchMarketStocks();
    const interval = setInterval(fetchMarketStocks, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get("http://localhost:3002/auth/me", {
          withCredentials: true,
        });
        setBalance(response.data.user.balance);
      } catch (error) {
        console.error(
          "Failed to fetch current user:",
          error.response?.data || error.message,
        );
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get("http://localhost:3002/watchlist", {
          withCredentials: true,
        });
        setUserWatchlist(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch watchlist:",
          error.response?.data || error.message,
        );
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        orderMode,
        recentOrders,
        onOrderSuccess: handleOrderSuccess,
        showToast,
        ordersRefresh,
        refreshOrders,
        holdingsRefresh,
        refreshHoldings,
        marketStocks,
        marketPrices,
        marketLoading,
        balance,
        setBalance,
        userWatchlist,
        setUserWatchlist,
      }}
    >
      {props.children}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          <i
            className={`fa-solid ${
              toast.type === "error" ? "fa-circle-xmark" : "fa-circle-check"
            }`}
          ></i>
          <span>{toast.message}</span>
        </div>
      )}
      {isBuyWindowOpen && (
        <BuyActionWindow uid={selectedStockUID} initialMode={orderMode} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
