import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const userId = localStorage.getItem("UID");
        if (userId) {
          setIsLoggedIn(true);
          const cartsRef = query(
            collection(db, "Carts"),
            where("userId", "==", userId)
          );
          const snapshot = await getDocs(cartsRef);
          let totalItems = 0;
          snapshot.forEach((doc) => {
            totalItems += doc.data().quantity;
          });

          setCartCount(totalItems);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCartCount();
  }, []);

  const handleUserClick = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    localStorage.removeItem("UID");
    window.location.reload();
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold mr-8">
            KKR STORE
          </Link>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#"
                className="text-green-500 underline-offset-8 underline font-semibold"
              >
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-500">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-500">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-green-500">
                Visit Us
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-2 py-1 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </button>
          </form>
          <button className="relative">
            <FontAwesomeIcon icon={faBell} className="text-gray-600 text-xl" />
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>
          <button>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="text-gray-600 text-xl"
            />
          </button>
          {isLoggedIn ? (
            <div className="relative">
              <button onClick={handleUserClick}>
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-gray-600 text-xl"
                />
              </button>
              {showDropdown && (
                <ul className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-800 hover:bg-green-500 hover:text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-green-500 hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-500 hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gray-900 rounded-md text-white px-6 py-2 hover:scale-105 font-semibold"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
