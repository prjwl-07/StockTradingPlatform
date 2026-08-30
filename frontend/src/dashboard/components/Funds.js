import React from "react";

const Funds = () => {
  return (
    <div className="page-container">
      <div className="page-header-flex">
        <div>
          <h3 className="title">Funds & Capital</h3>
          <p className="page-description">Trading account balance and margin overview</p>
        </div>
      </div>

      <div className="funds-grid">
        {/* Equity Section */}
        <div className="funds-column">
          <div className="summary-card">
            <div className="card-header-flex">
              <div className="card-title-group">
                <i className="fa-solid fa-chart-line section-icon"></i>
                <h3>Equity Account Funds</h3>
              </div>
              <span className="account-type-badge">ACTIVE</span>
            </div>

            <div className="margin-highlights">
              <div className="margin-highlight-box blue-bg">
                <span className="m-label">Available Margin</span>
                <h3 className="m-val">₹4,043.10</h3>
              </div>
              <div className="margin-highlight-box grey-bg">
                <span className="m-label">Used Margin</span>
                <h3 className="m-val">₹3,757.30</h3>
              </div>
            </div>

            <div className="fund-details-table">
              <div className="fund-row">
                <span>Available Cash</span>
                <span className="bold-val">₹4,043.10</span>
              </div>
              <div className="fund-row">
                <span>Opening Balance</span>
                <span>₹4,043.10</span>
              </div>
              <div className="fund-row">
                <span>SPAN Margin</span>
                <span>₹0.00</span>
              </div>
              <div className="fund-row">
                <span>Delivery Margin</span>
                <span>₹0.00</span>
              </div>
              <div className="fund-row-divider"></div>
              <div className="fund-row total-row">
                <span>Total Balance</span>
                <span className="bold-val">₹7,800.40</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;
