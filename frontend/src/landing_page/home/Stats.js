import React from "react";

function Stats() {
  return (
    <section className="container home-section">
      <div className="row align-items-center">
        <div className="col-md-6 stats-content">
          <h1 className="section-title">Trust with confidence</h1>

          <h2>Customer-first always</h2>
          <p>
            That's why 1.3+ crore customers trust Zerodha with ₹3.5+ lakh crores
            worth of equity investments.
          </p>

          <h2>No spam or gimmicks</h2>
          <p>
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>

          <h2>The Zerodha universe</h2>
          <p>
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services specific to your needs.
          </p>

          <h2>Do better with money</h2>
          <p>
            With initiatives like Nudge and Kill Switch, we don't just
            facilitate transactions, but actively help you do better with your
            money.
          </p>
        </div>

        <div className="col-md-6">
          <img
            src="/media/images/ecosystem.png"
            alt="Zerodha ecosystem"
            className="ecosystem-image"
          />

          <div className="stats-links">
            <a href="#">
              Explore our products <i className="fa fa-long-arrow-right"></i>
            </a>

            <a href="#">
              Try Kite demo <i className="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
