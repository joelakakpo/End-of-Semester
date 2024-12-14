import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Menu = ({ handleAddToCart }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setIsAuthenticated(true);
      fetchMenuItems(storedToken);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Fetch the menu items if authenticated
  const fetchMenuItems = async (authToken) => {
    try {
      const response = await axios.get("http://localhost:5001/api/menu", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h2>Menu</h2>
      {menuItems.length === 0 ? (
        <p>Loading menu items...</p>
      ) : (
        <div>
          {menuItems.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>${item.price}</p>
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
