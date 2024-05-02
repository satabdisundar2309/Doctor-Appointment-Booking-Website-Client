import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaBars, FaX } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  const {isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const [show, setShow] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/patient/logout",
        {
          method: "GET",
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`
          }
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("token")
        toast.success(data.message);
        setIsAuthenticated(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in navbar, handle logout", error);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="container">
      <div className="logo">
        <img src="/logo.png" alt="logo" className="logo-img" />
      </div>
      <div className={show ? "navLinks" : "navLinks showmenu"}>
        <div className="links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/appointment">Appointment</NavLink>
          <NavLink to="/about">About Us</NavLink>
        </div>
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="logoutBtn btn" onClick={goToLogin}>
            Login
          </button>
        )}
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        {show ? (
          <FaX style={{ cursor: "pointer" }} />
        ) : (
          <FaBars style={{ cursor: "pointer" }} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
