import React from "react";
import { Link } from "react-router-dom";

function Brokerage() {
  const charges = [
    "Call & Trade and RMS auto-squareoff: Additional charges of ₹50 + GST per order.",
    "Digital contract notes will be sent via e-mail.",
    "Physical copies of contract notes, if required, shall be charged ₹20 per contract note. Courier charges apply.",
    "For NRI account (non-PIS), 0.5% or ₹100 per executed order for equity (whichever is lower).",
    "For NRI account (PIS), 0.5% or ₹200 per executed order for equity (whichever is lower).",
    "If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.",
  ];

  return (
    <section className="brokerage-section">
      <div className="container">
        <div className="brokerage-header">
          <span>TRANSPARENT PRICING</span>
          <h2>Charges explained simply</h2>
          <p>
            Everything you need to know about brokerage and other applicable
            charges.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="brokerage-box">
              <div className="brokerage-title">
                <div>
                  <h3>Brokerage calculator</h3>
                  <p>Calculate the charges for your trades.</p>
                </div>

                <Link to="#" className="brokerage-action">
                  Calculate
                  <i className="fa fa-long-arrow-right"></i>
                </Link>
              </div>

              <div className="charges-list">
                {charges.map((charge, index) => (
                  <div className="charge-item" key={index}>
                    <span className="charge-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p>{charge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="charges-card">
              <div className="charges-icon">
                <i className="fa fa-list-ul"></i>
              </div>

              <h3>List of charges</h3>

              <p>
                View all applicable transaction, account and regulatory charges
                in one place.
              </p>

              <Link to="#">
                View all charges
                <i className="fa fa-long-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Brokerage;
