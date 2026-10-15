import React from "react";
import { Outlet } from "react-router-dom";

import TopBar from "../../dashboard/features/navbar/TopBar";
import Sidebar from "../../dashboard/features/sidebar/Sidebar";
import {
  GeneralContextProvider,
  HoldingsContextProvider,
} from "../../dashboard/contexts";
import "./DashboardLayout.css";
import "../../dashboard/dashboard.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-shell">
      <GeneralContextProvider>
        <HoldingsContextProvider>
          <TopBar />
          <div className="dashboard-container">
            <Sidebar />
            <div className="content">
              <Outlet />
            </div>
          </div>
        </HoldingsContextProvider>
      </GeneralContextProvider>
    </div>
  );
};

export default DashboardLayout;
