import React, { useContext, useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import GeneralContext from "./GeneralContext";

const Orders = () => {
  const { ordersRefresh } = useContext(GeneralContext);

  const [orders, setOrders] = useState([]);

  const [filter, setFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3002/newOrder", {
        withCredentials: true,
      });

      setOrders(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch orders:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * Runs:
   *
   * 1. When Orders component opens
   * 2. Whenever ordersRefresh changes
   */
  useEffect(() => {
    fetchOrders();
  }, [ordersRefresh]);

  const filteredOrders = orders.filter((order) => {
    if (filter === "BUY") {
      return order.mode === "BUY";
    }

    if (filter === "SELL") {
      return order.mode === "SELL";
    }

    return true;
  });

  if (loading) {
    return <div className="page-container">Loading orders...</div>;
  }

  return (
    <div className="page-container">
      {/* Header */}

      <div className="page-header-flex">
        <div>
          <h3 className="title">Orders ({orders.length})</h3>

          <p className="page-description">Order history</p>
        </div>

        <Link to="/dashboard" className="btn btn-secondary-outline">
          <i className="fa-solid fa-bolt"></i>
          Place Order
        </Link>
      </div>

      {/* Filters */}

      <div className="filter-tab-bar">
        <button
          className={`tab-filter-btn ${filter === "ALL" ? "active" : ""}`}
          onClick={() => setFilter("ALL")}
        >
          All ({orders.length})
        </button>

        <button
          className={`tab-filter-btn ${filter === "BUY" ? "active" : ""}`}
          onClick={() => setFilter("BUY")}
        >
          Buy Orders
        </button>

        <button
          className={`tab-filter-btn ${filter === "SELL" ? "active" : ""}`}
          onClick={() => setFilter("SELL")}
        >
          Sell Orders
        </button>
      </div>

      {/* Orders table */}

      {filteredOrders.length > 0 ? (
        <div className="order-table-card">
          <div className="table-responsive">
            <table className="custom-data-table">
              <thead>
                <tr>
                  <th>Order ID</th>

                  <th>Type</th>

                  <th>Instrument</th>

                  <th>Qty.</th>

                  <th>Price</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>

                    <td>
                      <span
                        className={`order-type-badge ${order.mode.toLowerCase()}`}
                      >
                        {order.mode}
                      </span>
                    </td>

                    <td className="instrument-col">
                      <span className="instrument-name">{order.name}</span>

                      <span className="instrument-badge">NSE</span>
                    </td>

                    <td>{order.qty}</td>

                    <td>₹{Number(order.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="no-orders-card">
          <div className="no-orders-icon">
            <i className="fa-regular fa-clipboard"></i>
          </div>

          <h4>No {filter !== "ALL" ? filter : ""} orders found</h4>

          <p>Place an order from the dashboard.</p>

          <Link to="/dashboard" className="btn btn-primary-gradient">
            Go to Watchlist
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;
