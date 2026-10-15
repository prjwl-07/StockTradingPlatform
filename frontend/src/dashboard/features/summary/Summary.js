import React, { useContext } from "react";
import { GeneralContext, HoldingsContext } from "../../contexts";
import { Link } from "react-router-dom";
import "./Summary.css";

const Summary = () => {
  const { balance } = useContext(GeneralContext);
  const { totalInvestment, currentValue, totalPnL, pnlPercent } =
    useContext(HoldingsContext);

  return (
    <div className="dashboard-summary-page d-flex flex-column">
      <div className="user-welcome-header d-flex align-items-center justify-content-between">
        <div>
          <h2>
            Portfolio Overview <span className="greeting-wave">👋</span>
          </h2>
          <p className="welcome-subtitle">
            Here is your portfolio snapshot for today.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon-badge blue">
            <i className="fa-solid fa-wallet"></i>
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Available Balance</span>
            <h3 className="kpi-value">₹{Number(balance).toFixed(2)}</h3>
            <span className="kpi-subtext">Equity Account</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-badge green">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Holdings Value</span>
            <h3 className="kpi-value">
              ₹
              {currentValue.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </h3>
            <span
              className={`kpi-subtext ${totalPnL >= 0 ? "profit-text" : "loss-text"}`}
            >
              <i className="fa-solid fa-arrow-trend-up"></i>{" "}
              {totalPnL >= 0 ? "+" : ""}₹
              {totalPnL.toLocaleString("en-IN", { minimumFractionDigits: 2 })} (
              {pnlPercent >= 0 ? "+" : ""}
              {pnlPercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-badge purple">
            <i className="fa-solid fa-coins"></i>
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Total Investment</span>
            <h3 className="kpi-value">
              ₹
              {totalInvestment.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </h3>
            <span className="kpi-subtext">Holdings Portfolio</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-badge orange">
            <i className="fa-solid fa-bolt"></i>
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Positions P&L</span>
            <h3 className="kpi-value profit-text">+₹12.50</h3>
            <span className="kpi-subtext">Open Positions</span>
          </div>
        </div>
      </div>

      {/* Account Details Sections */}
      <div className="summary-sections-grid">
        {/* Equity Card */}
        <div className="summary-card">
          <div className="card-header-flex d-flex align-items-center justify-content-between">
            <div className="card-title-group d-flex align-items-center">
              <i className="fa-solid fa-chart-pie section-icon"></i>
              <h3>Equity Overview</h3>
            </div>
            <Link to="/dashboard/funds" className="card-link">
              View Funds
            </Link>
          </div>

          <div className="metric-rows d-flex flex-column">
            <div className="metric-row d-flex align-items-center justify-content-between">
              <span className="metric-title">Available Cash</span>
              <span className="metric-val highlight">
                ₹{Number(balance).toFixed(2)}
              </span>
            </div>
            <div className="metric-row d-flex align-items-center justify-content-between">
              <span className="metric-title">Opening Balance</span>
              <span className="metric-val">₹4,043.10</span>
            </div>
          </div>
        </div>

        {/* Holdings Summary Card */}
        <div className="summary-card">
          <div className="card-header-flex d-flex align-items-center justify-content-between">
            <div className="card-title-group d-flex align-items-center">
              <i className="fa-solid fa-layer-group section-icon"></i>
              <h3>Holdings Overview</h3>
            </div>
            <Link to="/dashboard/holdings" className="card-link">
              View Holdings
            </Link>
          </div>

          <div className="metric-rows d-flex flex-column">
            <div className="metric-row d-flex align-items-center justify-content-between">
              <span className="metric-title">Total P&L</span>
              <span
                className={`metric-val ${totalPnL >= 0 ? "profit-text" : "loss-text"}`}
              >
                {totalPnL >= 0 ? "+" : ""}₹
                {totalPnL.toLocaleString("en-IN", { minimumFractionDigits: 2 })}{" "}
                ({pnlPercent >= 0 ? "+" : ""}
                {pnlPercent.toFixed(2)}%)
              </span>
            </div>
            <div className="metric-row d-flex align-items-center justify-content-between">
              <span className="metric-title">Current Value</span>
              <span className="metric-val">
                ₹
                {currentValue.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="metric-row d-flex align-items-center justify-content-between">
              <span className="metric-title">Investment Value</span>
              <span className="metric-val">
                ₹
                {totalInvestment.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
