import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="border-top"
      style={{
        backgroundColor: "#fafafa",
        color: "#666",
      }}
    >
      <div className="container py-4">
        <div className="row gy-4">
          {/* Logo */}
          <div className="col-12 col-md-3">
            <img
              src="/media/images/logo.svg"
              alt="Logo"
              style={{
                width: "120px",
                marginBottom: "15px",
              }}
            />

            <p
              className="text-muted mb-0"
              style={{
                fontSize: "12px",
                lineHeight: "1.7",
              }}
            >
              © 2010 - 2024
              <br />
              Not Zerodha Broking Ltd.
              <br />
              All rights reserved.
            </p>
          </div>

          {/* Company */}
          <div className="col-4 col-md-3">
            <h6 className="fw-semibold mb-3 text-dark">Company</h6>

            <div className="d-flex flex-column gap-2">
              <Link className="footer-link" to="/about">
                About
              </Link>

              <Link className="footer-link" to="/product">
                Products
              </Link>

              <Link className="footer-link" to="/pricing">
                Pricing
              </Link>

              <a className="footer-link" href="/">
                Careers
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="col-4 col-md-3">
            <h6 className="fw-semibold mb-3 text-dark">Support</h6>

            <div className="d-flex flex-column gap-2">
              <Link className="footer-link" to="/support">
                Support portal
              </Link>

              <a className="footer-link" href="/">
                Contact
              </a>

              <a className="footer-link" href="/">
                Downloads
              </a>

              <a className="footer-link" href="/">
                Charges
              </a>
            </div>
          </div>

          {/* Account */}
          <div className="col-4 col-md-3">
            <h6 className="fw-semibold mb-3 text-dark">Account</h6>

            <div className="d-flex flex-column gap-2">
              <Link className="footer-link" to="/signup">
                Open account
              </Link>

              <a className="footer-link" href="/">
                Fund transfer
              </a>

              <a className="footer-link" href="/">
                Privacy
              </a>

              <a className="footer-link" href="/">
                Terms
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-top mt-4 pt-3 d-flex flex-wrap justify-content-between gap-2"
          style={{ fontSize: "11px" }}
        >
          <span>
            Investments in securities market are subject to market risks.
          </span>

          <span>NSE · BSE · MCX · SEBI</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
