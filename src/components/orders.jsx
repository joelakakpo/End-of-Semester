import React from "react";
import { Link } from "react-router-dom";

const Orders = ({ orders }) => {
  if (orders.length === 0) {
    return <h3>No orders placed yet. Go back to the menu and place an order.</h3>;
  }

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} style={{ marginBottom: "20px", listStyle: "none" }}>
            <strong>Order ID:</strong> {order.id}
            <br />
            <strong>Current Status:</strong> {order.status || "Preparing"}
            <br />
            <Link to={`/ordertracking/${order.id}`}>
              <button style={{ marginTop: "10px" }}>Track Order</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
