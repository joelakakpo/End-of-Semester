import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cartItems }) => {
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price + (item.customization ? item.customizationPrice : 0),
      0
    );
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong> - ${item.price.toFixed(2)}
              {item.customization && (
                <span>
                  {" "}
                  + Customization (${item.customizationPrice.toFixed(2)}):{" "}
                  {item.customization}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      
      {/* Back to Menu button */}
      <Link to="/">
        <button>Back to Menu</button>
      </Link>
    </div>
  );
};

export default Cart;
