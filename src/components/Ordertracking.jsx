import React, { useEffect, useState } from "react";

const OrderTracking = ({ order }) => {
  if (!order) {
    return <h3>No order found. Please place an order first.</h3>; // Fallback if order is not passed
  }

  const [status, setStatus] = useState(order.status || "Preparing");
  const [statusHistory, setStatusHistory] = useState([order.status || "Preparing"]);

  useEffect(() => {
    const statusUpdates = ["Preparing", "Cooking", "Packing", "Ready for Pickup"];
    let currentIndex = statusUpdates.indexOf(status);

    const interval = setInterval(() => {
      if (currentIndex < statusUpdates.length - 1) {
        currentIndex++;
        const newStatus = statusUpdates[currentIndex];
        setStatus(newStatus);
        setStatusHistory((prev) => [...prev, newStatus]);
      } else {
        clearInterval(interval); // Stop updates after the final status
      }
    }, 5000); // Update status every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [status]);

  return (
    <div>
      <h2>Order Tracking</h2>
      <p>
        <strong>Order ID:</strong> {order.id}
      </p>
      <p>
        <strong>Current Status:</strong> {status}
      </p>
      <h3>Status History</h3>
      <ul>
        {statusHistory.map((status, index) => (
          <li key={index}>
            {status} {index === statusHistory.length - 1 && "(Current)"}
          </li>
        ))}
      </ul>
      {status === "Ready for Pickup" && (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#d4edda", borderRadius: "5px" }}>
          <strong>Your order is ready. Please pick it up!</strong>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
