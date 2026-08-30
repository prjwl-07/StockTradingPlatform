import React from "react";

const appsList = [
  {
    name: "Smallcase",
    category: "Thematic Investing",
    description: "Invest in modern, diversified stock baskets built by SEBI registered experts.",
    icon: "fa-solid fa-layer-group",
    badge: "POPULAR",
    badgeColor: "blue",
  },
  {
    name: "Sensibull",
    category: "Options Trading",
    description: "Analyze option chains, calculate strategy P&L projections, and trade safely.",
    icon: "fa-solid fa-chart-diagram",
    badge: "FEATURED",
    badgeColor: "purple",
  },
  {
    name: "Streak",
    category: "Algo & Backtesting",
    description: "Create, backtest, and deploy algorithmic trading strategies without coding.",
    icon: "fa-solid fa-robot",
    badge: "NEW",
    badgeColor: "orange",
  },
  {
    name: "TradingView",
    category: "Advanced Charts",
    description: "Professional technical analysis charting with 100+ indicators and drawing tools.",
    icon: "fa-solid fa-chart-candlestick",
    badge: "INTEGRATED",
    badgeColor: "green",
  },
  {
    name: "Stock Screener",
    category: "Fundamental Research",
    description: "Filter Indian stocks by PE ratio, Market Cap, ROCE, and Dividend Yield.",
    icon: "fa-solid fa-filter",
    badge: "FREE",
    badgeColor: "blue",
  },
  {
    name: "Console Statements",
    category: "Taxation & Reports",
    description: "Download P&L tax reports, tradebooks, contract notes, and holdings valuation.",
    icon: "fa-solid fa-file-invoice-dollar",
    badge: "CORE",
    badgeColor: "grey",
  },
];

const Apps = () => {
  return (
    <div className="page-container">
      <div className="page-header-flex">
        <div>
          <h3 className="title">Kite Trading Ecosystem & Apps</h3>
          <p className="page-description">
            Supercharge your investing & trading experience with integrated 3rd-party platforms
          </p>
        </div>
      </div>

      <div className="apps-grid">
        {appsList.map((app) => (
          <div key={app.name} className="app-card">
            <div className="app-card-top">
              <div className="app-icon-wrapper">
                <i className={app.icon}></i>
              </div>
              <span className={`app-badge ${app.badgeColor}`}>{app.badge}</span>
            </div>
            <div className="app-card-body">
              <span className="app-category">{app.category}</span>
              <h4 className="app-title">{app.name}</h4>
              <p className="app-desc">{app.description}</p>
            </div>
            <div className="app-card-footer">
              <button className="btn btn-secondary-outline w-100">
                Launch Platform <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
