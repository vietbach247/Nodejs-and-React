import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListCategory from "./ListCategory";
import ListCountry from "./ListCountry";
import { Category } from "../types/Category";
import { Country } from "../types/Country";
import { User } from "../types/User";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Header.scss"; // Import custom CSS for additional styling
import constant from "../axios";

type Props = {
  categories: Category[];
  countries: Country[];
};

const Header: FC<Props> = ({ categories, countries }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      setToken(token);

      if (token) {
        try {
          const response = await constant.get("/auth/profile");
          setUser(response.data);
        } catch (error) {
          setError("Lỗi khi lấy thông tin người dùng");
          console.error("Error fe+tching user profile:", error);
        }
      }
    };

    fetchUser();
  }, [token]);

  const handleLogout = async () => {
    try {
      if (confirm("Ban muon dang xuat khong?")) {
        await constant.post("/auth/logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
          <ul className="nav">
            {token ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white">
                    <Link to="/profile">Welcome {user?.name}</Link>
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="nav-link text-white btn btn-link"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
