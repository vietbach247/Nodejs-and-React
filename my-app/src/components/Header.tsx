import React, { FC } from "react";
import { Link } from "react-router-dom";
import ListCategory from "./ListCategory";
import ListCountry from "./ListCountry";
import { Category } from "../types/Category";
import { Country } from "../types/Country";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Header.scss"; // Import custom CSS for additional styling

type Props = {
  categories: Category[];
  countries: Country[];
};

const Header: FC<Props> = ({ categories, countries }) => {
  return (
    <header className="bg-dark text-white py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">
          <img
            src="https://png.pngtree.com/png-clipart/20200826/original/pngtree-movie-logo-movie-letter-v-png-image_5469427.jpg"
            alt="Logo"
            className="img-fluid"
            style={{ height: "50px" }}
          />
        </Link>
        <nav className="d-flex align-items-center">
          <ul className="nav">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-white">
                About
              </Link>
            </li>
            <li className="nav-item">
              <ListCategory categories={categories} />
            </li>
            <li className="nav-item">
              <ListCountry countries={countries} />
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link text-white">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link text-white">
                Register
              </Link>
            </li>
          </ul>
          <div className="search-bar ml-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm..."
            />
            <button className="btn btn-outline-light" type="button">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
