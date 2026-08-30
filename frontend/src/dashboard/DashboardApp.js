import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./index.css";

const DashboardApp = () => {
  return (
    <div className="dashboard-shell">
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default DashboardApp;
