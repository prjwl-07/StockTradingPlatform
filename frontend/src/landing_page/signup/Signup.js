import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend signup logic will come here later
    console.log("Mobile Number:", mobile);
  };

  return (
    <section className="container py-5">
      <div
        className="row align-items-center justify-content-between"
        style={{ minHeight: "70vh" }}
      >
        {/* Left Section */}
        <div className="col-12 col-lg-6 mb-5 mb-lg-0">
          <div style={{ maxWidth: "520px" }}>
            <p
              className="fw-semibold mb-2"
              style={{
                color: "#387ed1",
                letterSpacing: "1px",
                fontSize: "0.9rem",
              }}
            >
              START INVESTING TODAY
            </p>

            <h1
              className="fw-semibold mb-4"
              style={{
                color: "#424242",
                fontSize: "2.8rem",
                lineHeight: "1.2",
              }}
            >
              Open your free demat and trading account
            </h1>

            <p
              className="text-muted mb-4"
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.8",
              }}
            >
              Start investing in stocks, mutual funds, ETFs, and more with a
              simple and secure trading platform.
            </p>

            <div className="d-flex flex-column gap-3 text-muted">
              <div>
                <span className="me-3">✓</span>
                Simple and fast account opening
              </div>

              <div>
                <span className="me-3">✓</span>
                Secure and reliable platform
              </div>

              <div>
                <span className="me-3">✓</span>
                Access stocks, mutual funds and ETFs
              </div>
            </div>
          </div>
        </div>

        {/* Signup Card */}
        <div className="col-12 col-lg-5">
          <div
            className="bg-white border rounded-4 p-4 p-md-5"
            style={{
              boxShadow: "0 15px 45px rgba(0, 0, 0, 0.07)",
            }}
          >
            <h2 className="fw-semibold mb-2" style={{ color: "#424242" }}>
              Signup now
            </h2>

            <p className="text-muted mb-4">
              Enter your mobile number to get started
            </p>

            <form onSubmit={handleSubmit}>
              <label className="form-label fw-medium">Mobile number</label>

              <div className="input-group mb-4">
                <span className="input-group-text bg-white px-3">+91</span>

                <input
                  type="tel"
                  className="form-control py-3"
                  placeholder="Enter 10 digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  maxLength="10"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-3 fw-medium"
                style={{
                  backgroundColor: "#387ed1",
                  borderColor: "#387ed1",
                  borderRadius: "7px",
                }}
              >
                Continue
              </button>
            </form>

            <p
              className="text-muted text-center mt-4 mb-0"
              style={{ fontSize: "0.85rem", lineHeight: "1.6" }}
            >
              By continuing, you agree to our{" "}
              <a href="/" className="text-decoration-none">
                terms
              </a>{" "}
              and{" "}
              <a href="/" className="text-decoration-none">
                privacy policy
              </a>
              .
            </p>

            <hr className="my-4" />

            <p className="text-center text-muted mb-0">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-decoration-none fw-medium"
                style={{ color: "#387ed1" }}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
