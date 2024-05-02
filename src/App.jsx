import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { AppContext } from "./context/AppContext";
import Footer from "./components/Footer";

const App = () => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(AppContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/patient/userDetails/me",
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser({});
        }
      } catch (error) {
        console.log("Error in user fetching in App.jsx: ", error);
      }
    };

    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </>
  );
};

export default App;
