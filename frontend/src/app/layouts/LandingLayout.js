import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../landing_page/shared/Navbar";
import Footer from "../../landing_page/shared/Footer";

const LandingLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default LandingLayout;
