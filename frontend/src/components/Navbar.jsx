import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { getCartCount, logout, token } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect after logout
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <img src={assets.logo} className="w-36" alt="logo" />

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 outline-hidden">
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/collection">COLLECTION</NavLink>
        <NavLink to="/about">ABOUT</NavLink>
        <NavLink to="/contact">CONTACT</NavLink>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <img src={assets.search_icon} className="w-5 cursor-pointer" alt="search" />

        {/* Profile Dropdown */}
        <div className="group relative">
          <img className="w-5 cursor-pointer" src={assets.profile_icon} alt="profile" />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>

              {token ? (
                <button onClick={handleLogout} className="text-left cursor-pointer hover:text-black">
                  Logout
                </button>
              ) : (
                <NavLink to="/login" className="cursor-pointer hover:text-black">
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="cart" />
          {getCartCount() > 0 && (
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
              {getCartCount()}
            </p>
          )}
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Sidebar (Mobile Menu) */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          {visible && (
            <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
              <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="back" />
              <p>Back</p>
            </div>
          )}

          <NavLink to="/" onClick={() => setVisible(false)}>HOME</NavLink>
          <NavLink to="/collection" onClick={() => setVisible(false)}>COLLECTION</NavLink>
          <NavLink to="/about" onClick={() => setVisible(false)}>ABOUT</NavLink>
          <NavLink to="/contact" onClick={() => setVisible(false)}>CONTACT</NavLink>

          {/* Mobile Login/Logout */}
          {token ? (
            <button
              onClick={() => {
                handleLogout();
                setVisible(false);
              }}
              className="text-left p-3 hover:text-black"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setVisible(false)}
              className="p-3 hover:text-black"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

