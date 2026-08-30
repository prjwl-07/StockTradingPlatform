import React from "react";

function Education() {
  return (
    <section className="container home-section">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img
            src="/media/images/education.svg"
            alt="Market education"
            className="education-image"
          />
        </div>

        <div className="col-md-6 education-content">
          <h1 className="section-title">Free and open market education</h1>

          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>

          <a href="#">
            Varsity <i className="fa fa-long-arrow-right"></i>
          </a>

          <p className="education-second">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>

          <a href="#">
            TradingQ&A <i className="fa fa-long-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Education;
