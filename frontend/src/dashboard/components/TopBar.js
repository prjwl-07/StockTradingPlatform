import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="index-item">
          <span className="index-title">NIFTY 50</span>
          <span className="index-points up">22,419.50</span>
          <span className="index-chg up">+0.64%</span>
        </div>
        <div className="index-item">
          <span className="index-title">SENSEX</span>
          <span className="index-points up">73,878.15</span>
          <span className="index-chg up">+0.52%</span>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
