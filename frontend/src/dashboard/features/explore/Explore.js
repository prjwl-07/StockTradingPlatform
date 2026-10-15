import React, { useContext, useState } from "react";
import axios from "axios";
import { GeneralContext } from "../../contexts";
import { useNavigate } from "react-router-dom";
import "./Explore.css";

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

  const navigate = useNavigate();

  return (
    <>
      {/* {selectedStock && <StockDetails stock={selectedStock} />} */}
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
          <div className="explore-stock-grid">
            {filteredStocks.map((stock) => {
              const isWatched = watchedSymbols.has(stock.symbol);
              const changePercent = Number(stock.changePercent);
              const hasChange = Number.isFinite(changePercent);

              return (
                <article
                  className="explore-stock-card"
                  key={stock.symbol}
                  onClick={() => navigate(`/dashboard/stock/${stock.symbol}`)}
                >
                  <div className="explore-stock-card-heading">
                    <div className="explore-stock-name">
                      <strong>{stock.name}</strong>
                      <span>{stock.symbol}</span>
                    </div>
                    <span className="explore-stock-exchange">
                      {stock.exchange}
                    </span>
                  </div>

                  <div className="explore-stock-market-data">
                    <div>
                      <span className="explore-stock-label">Last price</span>
                      <strong className="explore-stock-price">
                        ₹{Number(stock.currentPrice).toFixed(2)}
                      </strong>
                    </div>
                    <span
                      className={`explore-stock-change ${
                        hasChange && changePercent < 0 ? "down" : "up"
                      }`}
                    >
                      {hasChange
                        ? `${changePercent > 0 ? "+" : ""}${changePercent.toFixed(2)}%`
                        : "--"}
                    </span>
                  </div>

                  <button
                    aria-label={
                      isWatched
                        ? `${stock.name} is in your watchlist`
                        : addingSymbol === stock.symbol
                          ? `Adding ${stock.name} to your watchlist`
                          : `Add ${stock.name} to your watchlist`
                    }
                    title={
                      isWatched
                        ? "Already in watchlist"
                        : addingSymbol === stock.symbol
                          ? "Adding to watchlist..."
                          : "Add to watchlist"
                    }
                    className={`explore-add-button ${isWatched ? "added" : ""}`}
                    disabled={isWatched || addingSymbol === stock.symbol}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (!isWatched && addingSymbol !== stock.symbol) {
                        addToWatchlist(stock.symbol);
                      }
                    }}
                    type="button"
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Explore;
