import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  const partners = [
    {
      logo: "/media/images/smallcaseLogo.png",
      name: "Smallcase",
      description: "Thematic investment platform",
    },
    {
      logo: "/media/images/streakLogo.png",
      name: "Streak",
      description: "Systematic trading platform",
    },
    {
      logo: "/media/images/sensibullLogo.svg",
      name: "Sensibull",
      description: "Options trading platform",
    },
    {
      logo: "/media/images/goldenpiLogo.png",
      name: "GoldenPi",
      description: "Bonds and fixed income investments",
    },
    {
      logo: "/media/images/dittoLogo.png",
      name: "Ditto",
      description: "Personalised insurance advisory",
    },
    {
      logo: "/media/images/zerodhaFundhouse.png",
      name: "Zerodha Fund House",
      description: "Simple and transparent mutual funds",
    },
  ];

  return (
    <section className="container py-5 my-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="fw-semibold mb-3">The Zerodha Universe</h1>

        <p
          className="text-muted mx-auto"
          style={{ maxWidth: "650px", lineHeight: "1.8" }}
        >
          Extend your trading and investment experience even further with our
          partner platforms.
        </p>
      </div>

      {/* Partner Cards */}
      <div className="row g-4 justify-content-center">
        {partners.map((partner, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={index}>
            <div
              className="h-100 text-center p-4 rounded-4 border bg-white"
              style={{
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center mb-4"
                style={{ height: "70px" }}
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="img-fluid"
                  style={{
                    maxWidth: "150px",
                    maxHeight: "50px",
                    objectFit: "contain",
                  }}
                />
              </div>

              <p className="text-muted small mb-0">{partner.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Signup Button */}
      <div className="text-center mt-5">
        <Link to="/signup">
          <button
            className="btn btn-primary px-5 py-2"
            style={{
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          >
            Sign up now
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Universe;
