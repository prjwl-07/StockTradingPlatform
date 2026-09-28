import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";

import HomePage from "./landing_page/home/HomePage";
import Signup from "./landing_page/signup/Signup";
import Login from "./landing_page/login/Login";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";

import NotFound from "./landing_page/NotFound";

import LandingLayout from "./LandingLayout";
import DashboardLayout from "./DashboardLayout";

import Summary from "./dashboard/components/Summary";
import Orders from "./dashboard/components/Orders";
import Holdings from "./dashboard/components/Holdings";
import Positions from "./dashboard/components/Positions";
import Funds from "./dashboard/components/Funds";
import Explore from "./dashboard/components/Explore";
import Apps from "./dashboard/components/Apps";
import ProtectedRoute from "./routes/ProtectedRoute";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {/* Landing pages */}
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Dashboard pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Summary />} />
        <Route path="explore" element={<Explore />} />
        <Route path="orders" element={<Orders />} />
        <Route path="holdings" element={<Holdings />} />
        <Route path="positions" element={<Positions />} />
        <Route path="funds" element={<Funds />} />
        <Route path="apps" element={<Apps />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
