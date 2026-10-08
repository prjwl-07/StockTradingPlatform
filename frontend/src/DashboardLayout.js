import React from "react";
import { Outlet } from "react-router-dom";

import TopBar from "./dashboard/components/TopBar";
import WatchList from "./dashboard/components/WatchList";
import {
  GeneralContextProvider,
  HoldingsContextProvider,
} from "./dashboard/contexts";
import "./dashboard/index.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-shell">
      <GeneralContextProvider>
        <HoldingsContextProvider>
          <TopBar />
          <div className="dashboard-container">
            <WatchList />
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
