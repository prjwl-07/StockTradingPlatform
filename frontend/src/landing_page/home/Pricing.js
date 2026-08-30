import React from "react";

function Pricing() {
  return (
    <section className="container home-section">
      <div className="row align-items-center">
        <div className="col-md-5">
          <h1 className="section-title">Unbeatable pricing</h1>

          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>

          <a href="#">
            See pricing <i className="fa fa-long-arrow-right"></i>
          </a>
        </div>

        <div className="col-md-1"></div>

        <div className="col-md-6">
          <div className="pricing-boxes">
            <div className="price-box">
              <h1>₹0</h1>
              <p>
                Free equity delivery and
                <br />
                direct mutual funds
              </p>
            </div>

            <div className="price-box">
              <h1>₹20</h1>
              <p>Intraday and F&O</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
