import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, initialMode = "BUY" }) => {
  const generalContext = useContext(GeneralContext);

  const { marketPrices } = generalContext;

  const [mode, setMode] = useState(initialMode);

  const [stockQuantity, setStockQuantity] = useState(1);

  const [stockPrice, setStockPrice] = useState(0);

  // Find the current stock price
  useEffect(() => {
    const currentPrice = marketPrices[uid]?.currentPrice;

    if (currentPrice !== undefined) {
      setStockPrice(Number(currentPrice));
    }
  }, [uid, marketPrices]);

  const handleOrderSubmit = async () => {
    const qty = parseInt(stockQuantity, 10);

    const price = parseFloat(stockPrice);

    // Validate quantity
    if (!qty || qty <= 0) {
      generalContext.showToast("Enter a valid quantity", "error");

      return;
    }

    // Validate price
    if (!price || price <= 0) {
      generalContext.showToast("Stock price is unavailable", "error");

      return;
    }

    const orderData = {
      name: uid,
      qty,
      price,
      mode,
    };

    try {
      // Send order to backend
      const response = await axios.post(
        "http://localhost:3002/newOrder",
        orderData,
        {
          withCredentials: true,
        },
      );

      console.log("Order response:", response.data);

      /*
       * Backend has successfully saved
       * the order.
       *
       * Now tell Orders.jsx to fetch
       * the latest orders.
       */
      generalContext.refreshOrders();
      generalContext.refreshHoldings();

      /*
       * Keep the existing success UI.
       */
      generalContext.onOrderSuccess(orderData);

      // Close order window
      generalContext.closeBuyWindow();
    } catch (error) {
      console.error("Order failed:", error.response?.data || error.message);

      generalContext.showToast(
        error.response?.data?.message || "Failed to place order",
        "error",
      );
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  const orderValue = stockPrice * (parseInt(stockQuantity, 10) || 0);

  return (
    <div className="order-window-backdrop" onClick={handleCancelClick}>
      <div className="order-window-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}

        <div className={`order-window-header ${mode.toLowerCase()}-bg`}>
          <div className="header-ticker-title">
            <span className="mode-tag">{mode}</span>

            <h3>{uid}</h3>

            <span className="exchange-sub font-mono">NSE</span>
          </div>

          <button className="header-close-btn" onClick={handleCancelClick}>
            &times;
          </button>
        </div>

        {/* BUY / SELL */}

        <div className="order-tabs-bar">
          <button
            className={`mode-btn buy-tab ${mode === "BUY" ? "active" : ""}`}
            onClick={() => setMode("BUY")}
          >
            BUY
          </button>

          <button
            className={`mode-btn sell-tab ${mode === "SELL" ? "active" : ""}`}
            onClick={() => setMode("SELL")}
          >
            SELL
          </button>
        </div>

        {/* Order form */}

        <div className="order-form-body">
          {/* Quantity */}

          <div className="input-field-box">
            <label>Quantity</label>

            <div className="number-stepper">
              <button
                type="button"
                onClick={() =>
                  setStockQuantity((q) => Math.max(1, parseInt(q || 1) - 1))
                }
              >
                -
              </button>

              <input
                type="number"
                min="1"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setStockQuantity((q) => parseInt(q || 0) + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Current price */}

          <div className="input-field-box">
            <label>Current Price</label>

            <div className="stock-price-display">₹{stockPrice.toFixed(2)}</div>
          </div>
        </div>

        {/* Footer */}

        <div className="order-window-footer">
          <div className="margin-calc-info">
            <span className="m-title">Order Value</span>

            <span className="m-amount">₹{orderValue.toFixed(2)}</span>
          </div>

          <div className="footer-button-group">
            <button
              className={`btn submit-order-btn ${
                mode === "BUY" ? "btn-blue" : "btn-orange"
              }`}
              onClick={handleOrderSubmit}
            >
              {mode} {uid}
            </button>

            <button className="btn btn-cancel" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
