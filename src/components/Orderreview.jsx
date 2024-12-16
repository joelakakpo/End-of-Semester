import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const OrderReview = ({ cartItems, setCartItems, handlePlaceOrder }) => {
  const [orderStatus, setOrderStatus] = useState(""); 
  const [loyaltyMessage, setLoyaltyMessage] = useState("");
  const [userPoints, setUserPoints] = useState(10); 
  const [pointsToRedeem, setPointsToRedeem] = useState(0); 

  // Set default quantity to 1
  useEffect(() => {
    setCartItems((prevCart) =>
      prevCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1, 
      }))
    );
  }, [setCartItems]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; 
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    let total = cartItems.reduce(
      (total, item) => {
        const itemPriceWithCustomization = item.customization
          ? item.price + item.customizationPrice
          : item.price; 
        return total + itemPriceWithCustomization * item.quantity;
      },
      0
    );
    
    const discount = Math.min(userPoints, pointsToRedeem);
    total -= discount;
    return total < 0 ? 0 : total; 
  };

  const handlePlaceOrderClick = () => {
    setOrderStatus("Preparing");
    setLoyaltyMessage(
      "Congratulations! You have earned 5 points for your loyalty."
    );
    setUserPoints(userPoints + 5); 
  };

  const handleConfirmPickupClick = () => {
    setOrderStatus("Ready for Pickup");
  };

  const handleRedeemPointsChange = (e) => {
    const points = parseInt(e.target.value, 10);
    if (points <= userPoints) {
      setPointsToRedeem(points);
    } else {
      setPointsToRedeem(userPoints); 
    }
  };

  return (
    <div>
      <h2>Order Tracking</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="order-item">
                <div>
                  <strong>{item.name}</strong> - ${item.price.toFixed(2)} x{" "}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value, 10))
                    }
                    style={{
                      width: "50px",
                      marginLeft: "5px",
                      marginRight: "5px",
                      textAlign: "center",
                    }}
                  />
                  = ${(item.price * item.quantity).toFixed(2)}
                  {item.customization && (
                    <span> + ${item.customizationPrice.toFixed(2)} (Customization)</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${calculateTotal().toFixed(2)}</h3>

          {/* Points Redemption Section */}
          <div style={{ marginTop: "15px" }}>
            <label>
              Redeem Points:
              <input
                type="number"
                value={pointsToRedeem}
                onChange={handleRedeemPointsChange}
                max={userPoints}
                min="0"
                style={{
                  width: "70px",
                  marginLeft: "10px",
                  textAlign: "center",
                }}
              />
              <span> Points</span>
            </label>
            <p>
              You have {userPoints} points available to redeem. Discount: $ {pointsToRedeem.toFixed(2)}
            </p>
          </div>

          {/* Buttons Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px" }}>
            <button className="cart-button" onClick={handlePlaceOrderClick}>
              Place Order
            </button>
            <button className="cart-button" onClick={handleConfirmPickupClick}>
              Confirm Pickup
            </button>
            {/* Styled Back to Menu button */}
            <Link to="/" className="nav-link" style={backToMenuButtonStyle}>
              Back to Menu
            </Link>
          </div>

          {/* Status Section */}
          {orderStatus && (
            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>Status:</strong> {orderStatus}
              </p>
            </div>
          )}

          {/* Loyalty Message */}
          {loyaltyMessage && (
            <div style={{ marginTop: "10px", color: "green" }}>
              <p>{loyaltyMessage}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const backToMenuButtonStyle = {
  backgroundColor: "#1976D2",
  color: "white",
  textDecoration: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  fontSize: "16px",
  textAlign: "center",
  display: "inline-block",
  marginTop: "10px",
  border: "none",
  transition: "background-color 0.3s, transform 0.3s",
};

export default OrderReview;
