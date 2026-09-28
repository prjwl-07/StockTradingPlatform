import React, { useContext } from "react";
import Menu from "./Menu";
import GeneralContext from "./GeneralContext";

const formatChange = (change) =>
  change == null ? "--" : `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;

const getChangeClass = (change) =>
  change == null ? "" : change >= 0 ? "up" : "down";

const TopBar = () => {
  const { marketPrices } = useContext(GeneralContext);
  const niftyChange = marketPrices["NIFTY50"]?.changePercent;
  const sensexChange = marketPrices["SENSEX"]?.changePercent;

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="index-item">
          <span className="index-title">NIFTY 50</span>
          <span className="index-points up">
            {marketPrices["NIFTY50"]?.currentPrice?.toFixed(2)}
          </span>

          <span className={`index-chg ${getChangeClass(niftyChange)}`}>
            {formatChange(niftyChange)}
          </span>
        </div>
        <div className="index-item">
          <span className="index-title">SENSEX</span>
          <span className="index-points up">
            {marketPrices["SENSEX"]?.currentPrice?.toFixed(2)}
          </span>
          <span className={`index-chg ${getChangeClass(sensexChange)}`}>
            {formatChange(sensexChange)}
          </span>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
