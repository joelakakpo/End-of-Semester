import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css"; 

const Menu = ({ handleAddToCart }) => {
  const [menuItems] = useState([
    { id: 1, name: "Cheese Pizza", price: 8.99, category: "Main Course", nutrition: "Calories: 300, Protein: 12g, Carbs: 36g, Fat: 14g", image: "images/cheezypizza.jpeg" },
    { id: 2, name: "Caesar Salad", price: 5.99, category: "Side Dish", nutrition: "Calories: 150, Protein: 5g, Carbs: 10g, Fat: 10g", image: "images/caesarsalad.jpg" },
    { id: 3, name: "Apple Juice", price: 2.99, category: "Beverage", nutrition: "Calories: 120, Protein: 0g, Carbs: 28g, Fat: 0g", image: "images/applejuice.jpg" },
    { id: 4, name: "Chicken Sandwich", price: 6.99, category: "Main Course", nutrition: "Calories: 450, Protein: 25g, Carbs: 40g, Fat: 20g", image: "images/sandwich.jpeg" },
    { id: 5, name: "French Fries", price: 3.99, category: "Side Dish", nutrition: "Calories: 220, Protein: 3g, Carbs: 28g, Fat: 10g", image: "images/frenchfries.jpg" },
    { id: 6, name: "Chocolate Milkshake", price: 4.99, category: "Beverage", nutrition: "Calories: 400, Protein: 8g, Carbs: 50g, Fat: 18g", image: "images/milkshake.jpg" },
    { id: 7, name: "Grilled Salmon", price: 10.99, category: "Main Course", nutrition: "Calories: 350, Protein: 30g, Carbs: 0g, Fat: 20g", image: "images/grilledsalmon.jpeg" },
    { id: 8, name: "Garden Salad", price: 4.99, category: "Side Dish", nutrition: "Calories: 80, Protein: 2g, Carbs: 10g, Fat: 5g", image: "images/gardernsalad.jpeg" },
    { id: 9, name: "Lemonade", price: 2.49, category: "Beverage", nutrition: "Calories: 100, Protein: 0g, Carbs: 25g, Fat: 0g", image: "images/lemonade.jpeg" },
  ]);

  const [customizations, setCustomizations] = useState({});
  const [addedItems, setAddedItems] = useState(new Set());

  const handleCustomizationChange = (id, value) => {
    setCustomizations((prev) => ({ ...prev, [id]: value }));
  };

  const addToCart = (item) => {
    const customizationText = customizations[item.id]?.trim();
    const hasCustomization = customizationText !== "";
    
    // Calculate the price with customization (if any)
    const customizationPrice = hasCustomization ? 2 : 0;
    const updatedPrice = item.price + customizationPrice;

    const cartItem = {
      ...item,
      price: updatedPrice, // Update the price with customization
      customization: hasCustomization ? customizationText : null,
      customizationPrice: customizationPrice,
    };

    handleAddToCart(cartItem);
    setAddedItems((prev) => new Set(prev).add(item.id));
    alert(`${item.name} added to cart!`);
  };

  return (
    <div>
      <h2>Menu</h2>
      <div className="menu-list">
        {menuItems.map((item) => {
          const isInCart = addedItems.has(item.id);

          return (
            <div key={item.id} className="menu-item">
              <div className="menu-item-header">
                <span className="menu-item-name">{item.name}</span>
                <span className="menu-item-price">${item.price}</span>
              </div>
              <img src={item.image} alt={item.name} className="menu-item-image" />
              <span className="menu-item-category">{item.category}</span>
              <span className="menu-item-nutrition">{item.nutrition}</span>

              <div className="customization-wrapper">
                <label>
                  Customizations:
                  <input
                    className="customization-input"
                    type="text"
                    placeholder="e.g., Extra cheese"
                    value={customizations[item.id] || ""}
                    onChange={(e) => handleCustomizationChange(item.id, e.target.value)}
                    disabled={isInCart}
                  />
                </label>
              </div>

              <button
                className="cart-button"
                onClick={() => addToCart(item)}
                disabled={isInCart}
                style={{
                  backgroundColor: isInCart ? "#4CAF50" : "#1976D2",
                  color: "white",
                  opacity: isInCart ? 0.9 : 1,
                }}
              >
                {isInCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
      <div className="navigation-links">
        <Link to="/cart" className="nav-link">View Cart</Link>
        <Link to="/ordertracking" className="nav-link">Order Tracking</Link>
      </div>
    </div>
  );
};

export default Menu;
