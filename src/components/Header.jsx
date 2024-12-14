import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>CUISINE ART
        <p> Bringing class to cuisine!</p></h1> 
  
      <nav>
        <Link to="/">Menu</Link> | <Link to="/cart">Cart</Link> |{" "}
        <Link to="/orders">Order Tracking</Link> | <Link to="/profile">Profile</Link> |{" "}
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;

