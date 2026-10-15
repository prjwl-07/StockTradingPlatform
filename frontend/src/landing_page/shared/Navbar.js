import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "#387ed1" : "#424242",
    fontWeight: isActive ? "600" : "400",
    borderBottom: isActive ? "2px solid #387ed1" : "2px solid transparent",
  });

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom shadow-sm"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="container py-2">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img
            src="/media/images/logo.svg"
            style={{ width: "140px" }}
            alt="Logo"
          />
        </NavLink>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                style={navLinkStyle}
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" style={navLinkStyle} to="/signup">
                Signup
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" style={navLinkStyle} to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" style={navLinkStyle} to="/product">
                Product
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" style={navLinkStyle} to="/pricing">
                Pricing
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" style={navLinkStyle} to="/support">
                Support
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
