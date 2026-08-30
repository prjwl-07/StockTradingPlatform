import React, { useState, useEffect } from "react";
import axios from "axios";
import { positions as fallbackPositions } from "../data/data";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [filterProduct, setFilterProduct] = useState("ALL");

  useEffect(() => {
    axios
      .get("http://localhost:3002/allPositions", { withCredentials: true })
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setAllPositions(res.data);
        } else {
          setAllPositions(fallbackPositions);
        }
      })
      .catch((err) => {
        console.warn("Backend not available or auth required, using local positions data.");
        setAllPositions(fallbackPositions);
      });
  }, []);

  const totalPnL = allPositions.reduce((acc, stock) => {
    const curValue = stock.price * stock.qty;
    return acc + (curValue - stock.avg * stock.qty);
  }, 0);

  return (
    <div className="page-container">
      <div className="page-header-flex">
        <div>
          <h3 className="title">Positions ({allPositions.length})</h3>
          <p className="page-description">Open trading positions</p>
        </div>
        <div className="pnl-header-summary">
          <span className="pnl-header-label">Total Realized & Unrealized P&L:</span>
          <span className={`pnl-header-value ${totalPnL >= 0 ? "profit-text" : "loss-text"}`}>
            {totalPnL >= 0 ? "+" : ""}₹{totalPnL.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="order-table-card">
        <div className="table-responsive">
          <table className="custom-data-table">
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. Price</th>
                <th>LTP</th>
                <th>P&L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {allPositions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const pnl = curValue - stock.avg * stock.qty;
                const isProfit = pnl >= 0;

                return (
                  <tr key={index}>
                    <td className="instrument-col">
                      <span className="instrument-name">{stock.name}</span>
                      <span className="instrument-badge">NSE</span>
                    </td>
                    <td>{stock.qty}</td>
                    <td>₹{stock.avg.toFixed(2)}</td>
                    <td>₹{stock.price.toFixed(2)}</td>
                    <td>
                      <span className={`pnl-badge ${isProfit ? "profit" : "loss"}`}>
                        {isProfit ? "+" : ""}₹{pnl.toFixed(2)}
                      </span>
                    </td>
                    <td className={stock.isLoss ? "loss-text" : "profit-text"}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Positions;
