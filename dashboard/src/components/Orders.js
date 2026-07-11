import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const generalContext = useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3005/allOrders")
      .then((res) => {
        setOrders(res.data || []);
      })
      .catch((err) => {
        console.warn("Failed to fetch orders from server", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [generalContext.renderTrigger]);

  if (isLoading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="orders-container">
      <h3 className="title">Orders ({orders.length})</h3>
      
      {orders.length === 0 ? (
        <div className="orders">
          <div className="no-orders">
            <p>You haven't placed any orders today</p>
            <Link to={"/"} className="btn btn-blue">
              Get started
            </Link>
          </div>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const modeClass = order.mode.toUpperCase() === "BUY" ? "buy" : "sell";
                return (
                  <tr key={index}>
                    <td className="font-semibold">{order.name}</td>
                    <td>{order.qty}</td>
                    <td>₹{order.price.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${modeClass}`}>
                        {order.mode.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <span className="badge status-success">Completed</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
