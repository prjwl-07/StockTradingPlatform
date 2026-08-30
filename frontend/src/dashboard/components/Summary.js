import React from "react";
import { Link } from "react-router-dom";

const Summary = () => {
  return (
    <div className="dashboard-summary-page">
      <div className="user-welcome-header">
        <div>
          <h2>Portfolio Overview <span className="greeting-wave">👋</span></h2>
          <p className="welcome-subtitle">Here is your portfolio snapshot for today.</p>
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
            <h3 className="kpi-value">₹4,043.10</h3>
            <span className="kpi-subtext">Equity Account</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-badge green">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Holdings Value</span>
            <h3 className="kpi-value">₹31,428.95</h3>
            <span className="kpi-subtext profit-text">
              <i className="fa-solid fa-arrow-trend-up"></i> +₹1,553.40 (+5.20%)
            </span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-badge purple">
            <i className="fa-solid fa-coins"></i>
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Total Investment</span>
            <h3 className="kpi-value">₹29,875.55</h3>
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
          <div className="card-header-flex">
            <div className="card-title-group">
              <i className="fa-solid fa-chart-pie section-icon"></i>
              <h3>Equity Overview</h3>
            </div>
            <Link to="/dashboard/funds" className="card-link">View Funds</Link>
          </div>

          <div className="metric-rows">
            <div className="metric-row">
              <span className="metric-title">Available Cash</span>
              <span className="metric-val highlight">₹4,043.10</span>
            </div>
            <div className="metric-row">
              <span className="metric-title">Opening Balance</span>
              <span className="metric-val">₹4,043.10</span>
            </div>
          </div>
        </div>

        {/* Holdings Summary Card */}
        <div className="summary-card">
          <div className="card-header-flex">
            <div className="card-title-group">
              <i className="fa-solid fa-layer-group section-icon"></i>
              <h3>Holdings Overview</h3>
            </div>
            <Link to="/dashboard/holdings" className="card-link">View Holdings</Link>
          </div>

          <div className="metric-rows">
            <div className="metric-row">
              <span className="metric-title">Total P&L</span>
              <span className="metric-val profit-text">+₹1,553.40 (+5.20%)</span>
            </div>
            <div className="metric-row">
              <span className="metric-title">Current Value</span>
              <span className="metric-val">₹31,428.95</span>
            </div>
            <div className="metric-row">
              <span className="metric-title">Investment Value</span>
              <span className="metric-val">₹29,875.55</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
