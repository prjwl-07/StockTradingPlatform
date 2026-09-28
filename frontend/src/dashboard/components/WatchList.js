import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";
import axios from "axios";

import { Tooltip, Grow } from "@mui/material";

import {
  // BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  // MoreHoriz,
} from "@mui/icons-material";

import { DoughnutChart } from "./DoughnoutChart";

// ======================================================
// WatchList
// ======================================================

const WatchList = () => {
  const { marketPrices, marketStocks, userWatchlist } =
    useContext(GeneralContext);

  const watchlist = userWatchlist.map((item) => {
    const stock = marketStocks.find(
      (marketStock) => marketStock.symbol === item.symbol,
    );
    const marketData = marketPrices[item.symbol];

    return {
      name: item.symbol,
      price: marketData?.currentPrice ?? stock?.currentPrice,
      percent: marketData?.changePercent ?? stock?.changePercent,
      exchange: stock?.exchange,
    };
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(1);

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase().trim()),
  );

  // Chart data
  const data = {
    labels: watchlist.slice(0, 6).map((stock) => stock.name),

    datasets: [
      {
        label: "Price (₹)",

        data: watchlist
          .slice(0, 6)
          .map(
            (stock) => marketPrices[stock.name]?.currentPrice ?? stock.price,
          ),

        backgroundColor: [
          "rgba(37, 99, 235, 0.75)",
          "rgba(16, 185, 129, 0.75)",
          "rgba(245, 158, 11, 0.75)",
          "rgba(139, 92, 246, 0.75)",
          "rgba(236, 72, 153, 0.75)",
          "rgba(14, 165, 233, 0.75)",
        ],

        borderColor: "#FFFFFF",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      {/* Search */}
      <div className="search-container">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>

        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          className="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <span className="counts">
          {filteredWatchlist.length} / {watchlist.length}
        </span>
      </div>

      {/* Watchlist */}
      <ul className="list">
        {filteredWatchlist.length > 0 ? (
          filteredWatchlist.map((stock, index) => (
            <WatchListItem
              stock={stock}
              marketData={marketPrices[stock.name]}
              key={index}
            />
          ))
        ) : (
          <li className="empty-watchlist">
            <i className="fa-solid fa-magnifying-glass"></i>

            <p>No stocks found matching "{searchTerm}"</p>
          </li>
        )}
      </ul>

      {/* Chart */}
      <div className="chart-card">
        <div className="chart-card-header">
          <span>Watchlist Allocation</span>
        </div>

        <div className="chart-wrapper">
          <DoughnutChart data={data} />
        </div>
      </div>

      {/* Pagination */}
      <div className="watchlist-number">
        <ul>
          {[1, 2, 3, 4, 5, 7].map((num) => (
            <li
              key={num}
              className={activeTab === num ? "active-page" : ""}
              onClick={() => setActiveTab(num)}
            >
              {num}
            </li>
          ))}
        </ul>

        <span className="page-info">WL {activeTab}</span>
      </div>
    </div>
  );
};

export default WatchList;

// ======================================================
// WatchList Item
// ======================================================

const WatchListItem = ({ stock, marketData }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const currentPrice = marketData?.currentPrice ?? stock.price;

  const changePercent = marketData?.changePercent ?? parseFloat(stock.percent);

  const isDown = changePercent < 0;

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
      className="watchlist-item-row"
    >
      <div className="item">
        {/* Stock name */}
        <div className="item-name-group">
          <span className={`stock-ticker ${isDown ? "down" : "up"}`}>
            {stock.name}
          </span>

          <span className="exchange-badge">{stock.exchange ?? "NSE"}</span>
        </div>

        {/* Price + Change */}
        <div className="item-info">
          <span className="price">₹{Number(currentPrice).toFixed(2)}</span>

          <span className={`percent ${isDown ? "down" : "up"}`}>
            {changePercent > 0 ? "+" : ""}
            {Number(changePercent).toFixed(2)}%
          </span>

          {isDown ? (
            <KeyboardArrowDown className="down trend-icon" />
          ) : (
            <KeyboardArrowUp className="up trend-icon" />
          )}
        </div>
      </div>

      {/* Buy / Sell / More */}
      {showWatchlistActions && <WatchListActions stock={stock} />}
    </li>
  );
};

// ======================================================
// WatchList Actions
// ======================================================

const WatchListActions = ({ stock }) => {
  const { openBuyWindow, userWatchlist, setUserWatchlist } =
    useContext(GeneralContext);
  const [removing, setRemoving] = useState(false);

  const handleBuyClick = (event) => {
    event.stopPropagation();
    openBuyWindow(stock.name, "BUY");
  };

  const handleSellClick = (event) => {
    event.stopPropagation();
    openBuyWindow(stock.name, "SELL");
  };

  const handleRemoveClick = async (event) => {
    event.stopPropagation();
    setRemoving(true);

    try {
      await axios.delete(
        `http://localhost:3002/watchlist/${encodeURIComponent(stock.name)}`,
        { withCredentials: true },
      );

      setUserWatchlist((current) =>
        current.filter((item) => item.symbol !== stock.name),
      );
    } catch (error) {
      console.error(
        "Failed to remove from watchlist:",
        error.response?.data || error.message,
      );
    } finally {
      setRemoving(false);
    }
  };

  return (
    <span className="actions">
      <div className="action-buttons-wrapper">
        <button className="buy" onClick={handleBuyClick}>
          Buy
        </button>
        <button className="sell" onClick={handleSellClick}>
          Sell
        </button>
        <button
          className="action"
          onClick={handleRemoveClick}
          disabled={removing}
        >
          {removing ? "Removing..." : "Remove"}
        </button>
      </div>
    </span>
  );
};
