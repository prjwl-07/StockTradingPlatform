import React, { useState, useEffect } from "react";
import axios from "axios";
import { watchlist } from "../data/data";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, mode = "BUY") => {},
  closeBuyWindow: () => {},
  orderMode: "BUY",
  recentOrders: [],
  onOrderSuccess: (order) => {},
  showToast: (message, type = "success") => {},

  // Used to tell Orders.jsx to fetch fresh orders
  ordersRefresh: 0,
  refreshOrders: () => {},

  // Used to tell Holdings.jsx to fetch fresh holdings
  holdingsRefresh: 0,
  refreshHoldings: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");

  // Existing local state
  const [recentOrders, setRecentOrders] = useState([]);

  const [toast, setToast] = useState(null);

  // Used only as a refresh signal
  const [ordersRefresh, setOrdersRefresh] = useState(0);

  const [holdingsRefresh, setHoldingsRefresh] = useState(0);

  const [marketPrices, setMarketPrices] = useState({});
  const [marketLoading, setMarketLoading] = useState(true);

  const showToast = (message, type = "success") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 4000);
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
      time: new Date().toLocaleTimeString("en-US", {
        hour12: false,
      }),
    };

    setRecentOrders((prev) => [newOrder, ...prev]);

    showToast(
      `${order.mode} order for ${order.qty} qty of ${order.name} submitted successfully!`,
    );
  };

  // Tell Orders.jsx to fetch the latest orders
  const refreshOrders = () => {
    setOrdersRefresh((prev) => prev + 1);
  };

  const refreshHoldings = () => {
    setHoldingsRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchMarketPrices = async () => {
      try {
        const symbols = watchlist.map((stock) => stock.name).join(",");

        const response = await axios.get(
          "http://localhost:3002/market/quotes",
          {
            params: {
              symbols,
            },
          },
        );

        const prices = {};

        response.data.forEach((stock) => {
          if (stock.found) {
            prices[stock.symbol] = {
              currentPrice: stock.currentPrice,
              changePercent: stock.changePercent,
            };
          }
        });

        setMarketPrices(prices);
        setMarketLoading(false);
      } catch (error) {
        console.error(
          "Failed to fetch market prices:",
          error.response?.data || error.message,
        );

        setMarketLoading(false);
      }
    };

    // Fetch immediately when dashboard loads
    fetchMarketPrices();

    // Then fetch every 5 seconds
    const interval = setInterval(fetchMarketPrices, 5000);

    // Stop polling when provider unmounts
    return () => clearInterval(interval);
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

        marketPrices,
        marketLoading
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
