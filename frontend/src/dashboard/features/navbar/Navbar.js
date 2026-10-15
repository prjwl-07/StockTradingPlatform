import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: "User", email: "" });

  useEffect(() => {
    fetch("http://localhost:3002/auth/me", { method: "GET", credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.user) {
          setUserProfile({ name: data.user.name, email: data.user.email });
        }
      })
      .catch(() => {});
  }, []);

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard" || location.pathname === "/dashboard/";
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Explore", path: "/dashboard/explore" },
    { label: "Orders", path: "/dashboard/orders" },
    { label: "Holdings", path: "/dashboard/holdings" },
    {
      label: "Positions",
      path: "/dashboard/positions",
      className: "nav-item-positions",
    },
    { label: "Apps", path: "/dashboard/apps", className: "nav-item-apps" },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3002/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const initials = userProfile.name
    ? userProfile.name.slice(0, 2).toUpperCase()
    : "ZU";

  return (
    <div className="menu-container">
      <div className="menus">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className={item.className}>
              <Link to={item.path} className="nav-link">
                <span
                  className={`menu-item ${isActive(item.path) ? "selected" : ""}`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="vertical-divider"></div>

        <div className="profile-wrapper">
          <div
            className="profile-btn"
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div className="avatar">{initials}</div>
            <span className="username">{userProfile.name}</span>
            <i
              className={`fa-solid fa-chevron-${isProfileDropdownOpen ? "up" : "down"} dropdown-arrow`}
            ></i>
          </div>

          {isProfileDropdownOpen && (
            <div className="profile-dropdown-menu">
              <div className="dropdown-header">
                <p className="user-fullname">{userProfile.name}</p>
                {userProfile.email && <p className="user-email">{userProfile.email}</p>}
              </div>
              <div className="dropdown-divider"></div>
              <Link
                to="/dashboard"
                className="dropdown-item"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <i className="fa-regular fa-user"></i> My Profile
              </Link>
              <Link
                to="/dashboard/funds"
                className="dropdown-item"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <i className="fa-solid fa-wallet"></i> Funds & Statements
              </Link>
              <Link
                to="/dashboard/apps"
                className="dropdown-item"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <i className="fa-solid fa-sliders"></i>
                <span className="profile-app-label">Platform Settings</span>
                <span className="compact-app-label">Apps</span>
              </Link>
              <Link
                to="/dashboard/positions"
                className="dropdown-item compact-profile-item"
                onClick={() => setIsProfileDropdownOpen(false)}
              >
                <i className="fa-solid fa-chart-line"></i> Positions
              </Link>
              <div className="dropdown-divider"></div>
              <button
                className="dropdown-item logout-btn"
                onClick={handleLogout}
              >
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
