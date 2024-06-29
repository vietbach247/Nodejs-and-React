import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/products">Shop</Link>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
