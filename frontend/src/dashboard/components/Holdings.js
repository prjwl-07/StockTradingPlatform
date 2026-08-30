import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const { holdingsRefresh, marketPrices } = useContext(GeneralContext);

  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's holdings from MongoDB
  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get("http://localhost:3002/allHoldings", {
          withCredentials: true,
        });

        setHoldings(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch holdings:",
          error.response?.data || error.message,
        );

        setHoldings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [holdingsRefresh]);

  if (loading) {
    return <div className="page-container">Loading holdings...</div>;
  }

  // Total investment = average buy price × quantity
  const totalInvestment = holdings.reduce(
    (total, stock) => total + stock.avg * stock.qty,
    0,
  );

  // Current value = current market price × quantity
  const currentValue = holdings.reduce((total, stock) => {
    const currentPrice = marketPrices[stock.name]?.currentPrice ?? stock.price;

    return total + currentPrice * stock.qty;
  }, 0);

  const totalPnL = currentValue - totalInvestment;

  const pnlPercent =
    totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  const chartData = {
    labels: holdings.map((stock) => stock.name),

    datasets: [
      {
        label: "Current Value (₹)",

        data: holdings.map((stock) => {
          const currentPrice =
            marketPrices[stock.name]?.currentPrice ?? stock.price;

          return currentPrice * stock.qty;
        }),

        backgroundColor: "rgba(37, 99, 235, 0.75)",
        borderColor: "#2563EB",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header-flex">
        <div>
          <h3 className="title">Holdings ({holdings.length})</h3>

          <p className="page-description">Your current stock holdings</p>
        </div>
      </div>

      {/* Summary */}
      <div className="holdings-summary-cards">
        <div className="summary-stat-card">
          <span className="stat-label">Total Investment</span>

          <h4 className="stat-value">
            ₹
            {totalInvestment.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </h4>
        </div>

        <div className="summary-stat-card">
          <span className="stat-label">Current Value</span>

          <h4 className="stat-value">
            ₹
            {currentValue.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </h4>
        </div>

        <div className="summary-stat-card">
          <span className="stat-label">Total P&L</span>

          <h4
            className={`stat-value ${
              totalPnL >= 0 ? "profit-text" : "loss-text"
            }`}
          >
            {totalPnL >= 0 ? "+" : ""}₹
            {totalPnL.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
            {" ("}
            {pnlPercent >= 0 ? "+" : ""}
            {pnlPercent.toFixed(2)}
            {"%)"}
          </h4>
        </div>
      </div>

      {/* No holdings */}
      {holdings.length === 0 ? (
        <div className="no-orders-card">
          <div className="no-orders-icon">
            <i className="fa-regular fa-folder-open"></i>
          </div>

          <h4>No holdings yet</h4>

          <p>Buy a stock to see it appear in your holdings.</p>
        </div>
      ) : (
        <>
          {/* Holdings Table */}
          <div className="order-table-card">
            <div className="table-responsive">
              <table className="custom-data-table">
                <thead>
                  <tr>
                    <th>Instrument</th>
                    <th>Qty.</th>
                    <th>Avg. Buy Price</th>
                    <th>Current Price</th>
                    <th>Current Value</th>
                    <th>P&L</th>
                    <th>Net Chg.</th>
                    <th>Day Chg.</th>
                  </tr>
                </thead>

                <tbody>
                  {holdings.map((stock) => {
                    const currentPrice =
                      marketPrices[stock.name]?.currentPrice ?? stock.price;

                    const investedValue = stock.avg * stock.qty;

                    const currentValue = currentPrice * stock.qty;

                    const pnl = currentValue - investedValue;

                    const isProfit = pnl >= 0;

                    return (
                      <tr key={stock._id}>
                        <td className="instrument-col">
                          <span className="instrument-name">{stock.name}</span>

                          <span className="instrument-badge">NSE</span>
                        </td>

                        <td>{stock.qty}</td>

                        <td>₹{Number(stock.avg).toFixed(2)}</td>

                        <td>₹{Number(currentPrice).toFixed(2)}</td>

                        <td>₹{currentValue.toFixed(2)}</td>

                        <td>
                          <span
                            className={`pnl-badge ${
                              isProfit ? "profit" : "loss"
                            }`}
                          >
                            {isProfit ? "+" : ""}₹{pnl.toFixed(2)}
                          </span>
                        </td>

                        <td className={isProfit ? "profit-text" : "loss-text"}>
                          {stock.net}
                        </td>

                        <td
                          className={
                            stock.day?.startsWith("-")
                              ? "loss-text"
                              : "profit-text"
                          }
                        >
                          {stock.day}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart */}
          <div className="chart-card holdings-chart-card">
            <div className="chart-card-header">
              <h4>Holdings Portfolio Allocation</h4>
            </div>

            <VerticalGraph data={chartData} />
          </div>
        </>
      )}
    </div>
  );
};

export default Holdings;
