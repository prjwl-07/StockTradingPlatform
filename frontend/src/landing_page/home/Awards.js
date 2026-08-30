import React from "react";

function Awards() {
  return (
    <section className="container home-section">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="/media/images/largestBroker.svg"
            alt="Largest stock broker"
            className="awards-image"
          />
        </div>

        <div className="col-md-6 awards-content">
          <h1 className="section-title">Largest stock broker in India</h1>

          <p className="section-text mb-4">
            2+ million Zerodha clients contribute to over 15% of all retail
            order volumes in India daily by trading and investing in:
          </p>

          <div className="row">
            <div className="col-6">
              <ul>
                <li>
                  <p>Futures and Options</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
                <li>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>

            <div className="col-6">
              <ul>
                <li>
                  <p>Stocks & IPOs</p>
                </li>
                <li>
                  <p>Direct mutual funds</p>
                </li>
                <li>
                  <p>Bonds and Govt. Securities</p>
                </li>
              </ul>
            </div>
          </div>

          <img
            src="/media/images/pressLogos.png"
            alt="Press logos"
            className="press-logos"
          />
        </div>
      </div>
    </section>
  );
}

export default Awards;
