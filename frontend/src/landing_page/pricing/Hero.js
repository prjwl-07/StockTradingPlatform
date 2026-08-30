import React from "react";
import "./Pricing.css";

function Hero() {
  const pricingItems = [
    {
      image: "/media/images/pricingEquity.svg",
      title: "Free equity delivery",
      description:
        "All equity delivery investments (NSE, BSE) are absolutely free — ₹0 brokerage.",
    },
    {
      image: "/media/images/intradayTrades.svg",
      title: "Intraday and F&O trades",
      description:
        "Flat ₹20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity.",
    },
    {
      image: "/media/images/pricingEquity.svg",
      title: "Free direct mutual funds",
      description:
        "All direct mutual fund investments are absolutely free — ₹0 commissions and DP charges.",
    },
  ];

  return (
    <main className="pricing-page">
      <section className="pricing-hero">
        <div className="container">
          <h1>Pricing</h1>
          <p>Free equity investments and flat ₹20 intraday and F&O trades</p>
        </div>
      </section>

      <section className="pricing-features">
        <div className="container">
          <div className="row g-5 justify-content-center">
            {pricingItems.map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="pricing-feature">
                  <div className="pricing-image-wrapper">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Hero;
