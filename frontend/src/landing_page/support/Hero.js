import React from "react";

function Hero() {
  return (
    <section>
      {/* Support Hero */}
      <div
        style={{
          backgroundColor: "#387ed1",
          color: "white",
        }}
      >
        <div className="container py-5">
          {/* Top Bar */}
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h4 className="fw-semibold mb-0">Support Portal</h4>

            <a
              href="/"
              className="text-white text-decoration-none border-bottom"
            >
              Track tickets
            </a>
          </div>

          <div className="row g-5">
            {/* Search Section */}
            <div className="col-12 col-lg-7">
              <h1
                className="fw-semibold mb-4"
                style={{
                  fontSize: "2rem",
                  lineHeight: "1.4",
                  maxWidth: "650px",
                }}
              >
                Search for an answer or browse help topics to create a ticket
              </h1>

              {/* Search Box */}
              <div
                className="d-flex align-items-center bg-white rounded-3 px-4 mb-4"
                style={{
                  maxWidth: "650px",
                  height: "65px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                }}
              >
                <span
                  className="me-3"
                  style={{
                    color: "#777",
                    fontSize: "1.3rem",
                  }}
                >
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Eg. how do I activate F&O?"
                  className="border-0 w-100"
                  style={{
                    outline: "none",
                    fontSize: "1rem",
                  }}
                />
              </div>

              {/* Popular Links */}
              <p className="mb-3 opacity-75">Popular searches</p>

              <div
                className="d-flex flex-wrap gap-3"
                style={{ maxWidth: "650px" }}
              >
                {[
                  "Track account opening",
                  "Track segment activation",
                  "Intraday margins",
                  "Kite user manual",
                ].map((item, index) => (
                  <a
                    key={index}
                    href="/"
                    className="text-white text-decoration-none"
                    style={{
                      fontSize: "0.9rem",
                      borderBottom: "1px solid rgba(255,255,255,0.5)",
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Featured Section */}
            <div className="col-12 col-lg-5">
              <div
                className="p-4 rounded-4 h-100"
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <h3 className="fw-semibold mb-4">Featured</h3>

                <div className="d-flex gap-3 mb-4">
                  <span
                    className="d-flex align-items-center justify-content-center bg-white text-primary rounded-circle flex-shrink-0"
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "0.85rem",
                    }}
                  >
                    1
                  </span>

                  <a
                    href="/"
                    className="text-white text-decoration-none"
                    style={{ lineHeight: "1.7" }}
                  >
                    Current Takeovers and Delisting - January 2024
                  </a>
                </div>

                <div className="d-flex gap-3">
                  <span
                    className="d-flex align-items-center justify-content-center bg-white text-primary rounded-circle flex-shrink-0"
                    style={{
                      width: "32px",
                      height: "32px",
                      fontSize: "0.85rem",
                    }}
                  >
                    2
                  </span>

                  <a
                    href="/"
                    className="text-white text-decoration-none"
                    style={{ lineHeight: "1.7" }}
                  >
                    Latest Intraday leverages - MIS & CO
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
