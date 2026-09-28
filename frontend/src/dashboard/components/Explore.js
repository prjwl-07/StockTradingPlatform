import React, { useContext, useState } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Explore = () => {
  const { marketStocks, marketLoading, userWatchlist, setUserWatchlist } =
    useContext(GeneralContext);
  const [search, setSearch] = useState("");
  const [addingSymbol, setAddingSymbol] = useState(null);

  const watchedSymbols = new Set(userWatchlist.map((item) => item.symbol));
  const filteredStocks = marketStocks
    .filter((stock) => stock.type === "STOCK")
    .filter(
      (stock) =>
        stock.name.toLowerCase().includes(search.toLowerCase().trim()) ||
        stock.symbol.toLowerCase().includes(search.toLowerCase().trim()),
    );

  const addToWatchlist = async (symbol) => {
    setAddingSymbol(symbol);

    try {
      const response = await axios.post(
        "http://localhost:3002/watchlist",
        { symbol },
        { withCredentials: true },
      );

      setUserWatchlist((current) =>
        current.some((item) => item.symbol === symbol)
          ? current
          : [...current, response.data],
      );
    } catch (error) {
      console.error(
        "Failed to add to watchlist:",
        error.response?.data || error.message,
      );
    } finally {
      setAddingSymbol(null);
    }
  };

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h2 className="explore-title">Explore</h2>
        <span className="explore-count">{filteredStocks.length} stocks</span>
      </div>

      <input
        type="text"
        placeholder="Search stocks..."
        aria-label="Search stocks"
        className="explore-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {marketLoading && marketStocks.length === 0 ? (
        <p className="explore-state">Loading stocks...</p>
      ) : filteredStocks.length === 0 ? (
        <p className="explore-state">No stocks match your search.</p>
      ) : (
        <div className="explore-stock-list">
          {filteredStocks.map((stock) => {
            const isWatched = watchedSymbols.has(stock.symbol);

            return (
              <div className="explore-stock-row" key={stock.symbol}>
                <div className="explore-stock-name">
                  <strong>{stock.name}</strong>
                  <span>
                    {stock.symbol} · {stock.exchange}
                  </span>
                </div>
                <span className="explore-stock-price">
                  ₹{Number(stock.currentPrice).toFixed(2)}
                </span>
                <button
                  className="explore-add-button"
                  disabled={isWatched || addingSymbol === stock.symbol}
                  onClick={() => addToWatchlist(stock.symbol)}
                >
                  {isWatched
                    ? "Added"
                    : addingSymbol === stock.symbol
                      ? "Adding..."
                      : "Add"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Explore;
