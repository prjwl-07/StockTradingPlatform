import React, { useContext, useState } from "react";
import { GeneralContext } from "../../contexts";
import "./Indices.css";

const toFiniteNumber = (value) => {
  if (value == null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const formatChange = (change) => {
  const numericChange = toFiniteNumber(change);
  if (numericChange == null) return "--";
  return `${numericChange >= 0 ? "+" : ""}${numericChange.toFixed(2)}%`;
};

const getChangeClass = (change) => {
  const numericChange = toFiniteNumber(change);
  if (numericChange == null) return "";
  return numericChange >= 0 ? "up" : "down";
};

const Indices = () => {
  const { marketPrices } = useContext(GeneralContext);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const indexData = [
    { symbol: "NIFTY50", label: "NIFTY 50" },
    { symbol: "SENSEX", label: "SENSEX" },
  ];

  return (
    <div className="indices-container">
      {indexData.map(({ symbol, label }) => {
        const marketData = marketPrices[symbol];
        const isExpanded = expandedIndex === symbol;
        const currentPrice = toFiniteNumber(marketData?.currentPrice);

        return (
          <div className="index-item" key={symbol}>
            <button
              aria-expanded={isExpanded}
              className="index-toggle"
              onClick={() => setExpandedIndex(isExpanded ? null : symbol)}
              type="button"
            >
              <span className="index-title">{label}</span>
              <span
                className={`index-chg ${getChangeClass(marketData?.changePercent)}`}
              >
                {formatChange(marketData?.changePercent)}
              </span>
              <span
                aria-hidden="true"
                className={`index-arrow ${isExpanded ? "expanded" : ""}`}
              />
            </button>
            {isExpanded && (
              <div className="index-points">
                {currentPrice == null ? "--" : currentPrice.toFixed(2)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Indices;
