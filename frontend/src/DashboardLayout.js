import React from "react";
import { Outlet } from "react-router-dom";

import TopBar from "./dashboard/components/TopBar";
import WatchList from "./dashboard/components/WatchList";
import { GeneralContextProvider } from "./dashboard/components/GeneralContext";
import "./dashboard/index.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-shell">
      <GeneralContextProvider>
        <TopBar />
        <div className="dashboard-container">
          <WatchList />
          <div className="content">
            <Outlet />
          </div>
        </div>
      </GeneralContextProvider>
    </div>
  );
};

export default DashboardLayout;
