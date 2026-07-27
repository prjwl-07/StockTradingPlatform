import React from "react";
import { Link } from "react-router-dom";

function CreateTicket() {
  const ticketTopics = [
    {
      title: "Account Opening",
      icon: "fa-plus-circle",
      links: [
        "Online Account Opening",
        "Offline Account Opening",
        "Company, Partnership and HUF Account",
        "NRI Account Opening",
        "Charges at Zerodha",
        "Zerodha IDFC FIRST Bank 3-in-1 Account",
        "Getting Started",
      ],
    },
    {
      title: "Your Zerodha Account",
      icon: "fa-user",
      links: [
        "Your Profile",
        "Account Modification",
        "Client Master Report",
        "Nomination",
        "Transfer and Conversion of Shares",
        "Account Closure",
      ],
    },
    {
      title: "Trading and Markets",
      icon: "fa-line-chart",
      links: [
        "Trading FAQs",
        "Kite",
        "Margins",
        "Product and Order Types",
        "Corporate Actions",
        "Market Timings",
      ],
    },
    {
      title: "Funds",
      icon: "fa-inr",
      links: [
        "Add Money",
        "Withdraw Money",
        "Bank Accounts",
        "Fund Transfer",
        "Payment Gateway",
        "UPI",
      ],
    },
    {
      title: "Console",
      icon: "fa-pie-chart",
      links: [
        "Portfolio",
        "Reports",
        "Profile",
        "Segments",
        "60 Day Challenge",
        "Tax P&L",
      ],
    },
    {
      title: "Coin",
      icon: "fa-bar-chart",
      links: [
        "Understanding Mutual Funds",
        "Buying and Selling",
        "Starting an SIP",
        "Coin App",
        "Government Securities",
        "Mutual Fund Orders",
      ],
    },
  ];

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fs-2 fw-semibold">Create a support ticket</h1>

        <p className="text-muted mt-2">
          Select a relevant topic and find the help you need.
        </p>
      </div>

      <div className="row g-4">
        {ticketTopics.map((topic, index) => (
          <div className="col-lg-4 col-md-6 col-12" key={index}>
            <div className="ticket-card h-100 p-4">
              <h4 className="ticket-title mb-4">
                <i className={`fa ${topic.icon} me-3`} aria-hidden="true"></i>

                {topic.title}
              </h4>

              <div className="d-flex flex-column gap-3">
                {topic.links.map((link, linkIndex) => (
                  <Link to="/support" className="ticket-link" key={linkIndex}>
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreateTicket;
