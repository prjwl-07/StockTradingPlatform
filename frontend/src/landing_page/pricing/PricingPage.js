import React from "react";
import Hero from "./Hero";
import Brokerage from "./Brokerage";
import OpenAccount from "../OpenAccount";
import "./Pricing.css";

function PricingPage() {
  return (
    <div className="pricing-page-wrapper">
      <Hero />
      <Brokerage />
      <OpenAccount />
    </div>
  );
}

export default PricingPage;
