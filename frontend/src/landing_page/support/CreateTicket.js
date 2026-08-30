import React from "react";
import { Link } from "react-router-dom";
import "./CreateTicket.css";

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
    <section className="ticket-section">
      <div className="container">
        <div className="ticket-heading">
          <span className="ticket-label">SUPPORT CENTER</span>

          <h1>Create a support ticket</h1>

          <p>
            Choose a category below to find answers and get the help you need.
          </p>
        </div>

        <div className="row g-4">
          {ticketTopics.map((topic, index) => (
            <div className="col-lg-4 col-md-6 col-12" key={index}>
              <div className="ticket-card">
                <div className="ticket-card-header">
                  <div className="ticket-icon">
                    <i className={`fa ${topic.icon}`} aria-hidden="true"></i>
                  </div>

                  <h4>{topic.title}</h4>
                </div>

                <div className="ticket-links">
                  {topic.links.map((link, linkIndex) => (
                    <Link to="/support" className="ticket-link" key={linkIndex}>
                      <span>{link}</span>

                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CreateTicket;
