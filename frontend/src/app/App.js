import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../landing_page/home/HomePage";
import Signup from "../landing_page/signup/Signup";
import Login from "../landing_page/login/Login";
import AboutPage from "../landing_page/about/AboutPage";
import ProductPage from "../landing_page/products/ProductsPage";
import PricingPage from "../landing_page/pricing/PricingPage";
import SupportPage from "../landing_page/support/SupportPage";
import NotFound from "../landing_page/shared/NotFound";
import LandingLayout from "./layouts/LandingLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Summary from "../dashboard/features/summary/Summary";
import Orders from "../dashboard/features/orders/Orders";
import Holdings from "../dashboard/features/holdings/Holdings";
import Positions from "../dashboard/features/positions/Positions";
import Funds from "../dashboard/features/funds/Funds";
import Explore from "../dashboard/features/explore/Explore";
import Apps from "../dashboard/features/apps/Apps";
import ProtectedRoute from "./routes/ProtectedRoute";
import StockDetails from "../dashboard/features/stock-details/StockDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route path="/dashboard/stock/:symbol" element={<StockDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
