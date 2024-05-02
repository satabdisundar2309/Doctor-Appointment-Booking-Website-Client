import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate, useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const {token, setToken, isAuthenticated, setIsAuthenticated } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/loginUser", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          role: "Patient",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("token", data.token)
        console.log(token)
        toast.success(data.message);
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        setIsAuthenticated(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in log in page: ", error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Login here</h2>
      <p>Please login to continue</p>
      <p>Please fill all the fields to login and book appointment</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Not registered yet?</p>
          <NavLink
            to={"/register"}
            style={{ textDecoration: "none", color: "#271776ca" }}
          >
            <strong>Register Now</strong>
          </NavLink>
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
