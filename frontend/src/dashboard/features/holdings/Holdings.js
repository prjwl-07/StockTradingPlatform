import React, { useContext } from "react";
import { HoldingsContext } from "../../contexts";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const {
    holdings,
    holdingsLoading,
    totalInvestment,
    currentValue,
    totalPnL,
    pnlPercent,
    chartData,
  } = useContext(HoldingsContext);

  if (holdingsLoading) {
    return <div className="page-container d-flex flex-column">Loading holdings...</div>;
  }

  return (
    <div className="page-container d-flex flex-column">
      {/* Header */}
      <div className="page-header-flex d-flex align-items-center justify-content-between">
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
                  {holdings.map((stock) => (
                    <tr key={stock._id}>
                      <td className="instrument-col">
                        <span className="instrument-name">{stock.name}</span>

                        <span className="instrument-badge">NSE</span>
                      </td>

                      <td>{stock.qty}</td>

                      <td>₹{Number(stock.avg).toFixed(2)}</td>

                      <td>₹{Number(stock.currentPrice).toFixed(2)}</td>

                      <td>₹{stock.currentValue.toFixed(2)}</td>

                      <td>
                        <span
                          className={`pnl-badge ${
                            stock.isProfit ? "profit" : "loss"
                          }`}
                        >
                          {stock.isProfit ? "+" : ""}₹{stock.pnl.toFixed(2)}
                        </span>
                      </td>

                      <td
                        className={
                          stock.netChange >= 0 ? "profit-text" : "loss-text"
                        }
                      >
                        {stock.netChange >= 0 ? "+" : ""}
                        {stock.netChange.toFixed(2)}%
                      </td>

                      <td
                        className={
                          stock.dayChange >= 0 ? "profit-text" : "loss-text"
                        }
                      >
                        {stock.dayChange >= 0 ? "+" : ""}
                        {stock.dayChange.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
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
