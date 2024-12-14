import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const { pointsEarned, order } = location.state || {};

  if (!order) {
    return <p>No order details found. Please place an order first.</p>;
  }

  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <p>
        <strong>Points Earned: </strong>
        {pointsEarned}
      </p>
      <p>
        <strong>Order Total: </strong>${order.total}
      </p>
      <h3>Order Details:</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong> - ${item.price.toFixed(2)} x{" "}
            {item.quantity}
          </li>
        ))}
      </ul>
      <Link to="/">Back to Menu</Link>
    </div>
  );
};

export default OrderConfirmation;
