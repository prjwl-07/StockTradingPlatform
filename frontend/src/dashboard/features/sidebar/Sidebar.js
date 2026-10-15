import React from "react";
import Indices from "./Indices";
import WatchList from "./WatchList";
import "./Sidebar.css";

const Sidebar = () => (
  <aside className="dashboard-sidebar">
    <Indices />
    <WatchList />
  </aside>
);

export default Sidebar;
