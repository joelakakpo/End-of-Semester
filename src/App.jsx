import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import OrderReview from "./components/OrderReview";
import OrderTracking from "./components/OrderTracking";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // Add item to the cart
  const handleAddToCart = (item) => {
    setCartItems((prevCart) => {
      if (prevCart.some((cartItem) => cartItem.id === item.id)) {
        return prevCart; // Prevent duplicate items
      }
      return [...prevCart, item]; // Add new item
    });
  };

  // Remove item from the cart
  const handleRemoveFromCart = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Place order and clear the cart
  const handlePlaceOrder = (navigate) => {
    if (cartItems.length === 0) {
      alert("Your cart is empty! Add items before placing an order.");
      return;
    }
    setCartItems([]); // Clear the cart after placing the order
    alert("Order placed successfully!");
    navigate("/"); // Redirect to home after order
  };

  // Handle login
  const handleLogin = (navigate) => {
    setIsLoggedIn(true);
    navigate("/"); // Redirect to the menu page after login
  };

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCartItems([]); // Clear cart on logout
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> {/* Navigation Header */}
      <main>
        <Routes>
          {/* Conditional rendering: Redirect to Login/Register if not logged in */}
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register onRegister={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              {/* Authenticated Routes */}
              <Route path="/" element={<Menu handleAddToCart={handleAddToCart} />} />
              <Route
                path="/cart"
                element={<Cart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />}
              />
              <Route
                path="/orders"
                element={
                  <OrderReview
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    handlePlaceOrder={handlePlaceOrder}
                  />
                }
              />
              <Route path="/ordertracking" element={<OrderTracking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </main>
      <Footer /> {/* Footer */}
    </Router>
  );
};

export default App;
