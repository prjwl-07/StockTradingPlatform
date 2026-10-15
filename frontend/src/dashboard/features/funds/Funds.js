import React, { useContext } from "react";
import { GeneralContext } from "../../contexts";
import "./Funds.css";

const Funds = () => {
  const { balance } = useContext(GeneralContext);

  return (
    <div className="page-container d-flex flex-column">
      <div className="page-header-flex d-flex align-items-center justify-content-between">
        <div>
          <h3 className="title">Funds & Capital</h3>
          <p className="page-description">
            Trading account balance and margin overview
          </p>
        </div>
      </div>

      <div className="funds-grid">
        <div className="funds-column">
          <div className="summary-card">
            <div className="card-header-flex d-flex align-items-center justify-content-between">
              <div className="card-title-group d-flex align-items-center">
                <i className="fa-solid fa-chart-line section-icon"></i>
                <h3>Equity Account Funds</h3>
              </div>

              <span className="account-type-badge">ACTIVE</span>
            </div>

            <div className="margin-highlights">
              <div className="margin-highlight-box d-flex flex-column blue-bg">
                <span className="m-label">Available Margin</span>
                <h3 className="m-val">₹{balance.toFixed(2)}</h3>
              </div>

              <div className="margin-highlight-box d-flex flex-column grey-bg">
                <span className="m-label">Used Margin</span>
                <h3 className="m-val">₹0.00</h3>
              </div>
            </div>

            <div className="fund-details-table d-flex flex-column">
              <div className="fund-row d-flex align-items-center justify-content-between">
                <span>Available Cash</span>
                <span className="bold-val">₹{balance.toFixed(2)}</span>
              </div>

              <div className="fund-row d-flex align-items-center justify-content-between">
                <span>Opening Balance</span>
                <span>₹100,000.00</span>
              </div>

              <div className="fund-row d-flex align-items-center justify-content-between">
                <span>SPAN Margin</span>
                <span>₹0.00</span>
              </div>

              <div className="fund-row d-flex align-items-center justify-content-between">
                <span>Delivery Margin</span>
                <span>₹0.00</span>
              </div>

              <div className="fund-row-divider"></div>

              <div className="fund-row total-row d-flex align-items-center justify-content-between">
                <span>Total Balance</span>
                <span className="bold-val">₹{balance.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;
