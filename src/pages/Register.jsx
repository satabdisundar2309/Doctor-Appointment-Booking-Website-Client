import React, { useContext, useState } from 'react'
import {AppContext} from '../context/AppContext'
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Register = () => {
  const navigate = useNavigate();
  const {token, setToken, isAuthenticated, setIsAuthenticated} = useContext(AppContext)

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegistration = async (e)=>{
    e.preventDefault()
    try {
      const response = await fetch("https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/registerPatient",{
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phone,
          adhaar,
          age,
          gender,
          password,
          confirmPassword
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()
      if(response.ok){
        setIsAuthenticated(true)
        localStorage.setItem("token", data.token)
        setFirstname("")
        setLastname("")
        setEmail("")
        setPhone("")
        setAdhaar("")
        setAge("")
        setGender("")
        setPassword("")
        setConfirmPassword("")
        navigate("/")
        toast.success(data.message)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log("Error in registration page: ", error)
    }
  }

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component register-form">
      <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>
        <p>
          Please fill all the fields to sign up and book appointment
        </p>
        <form onSubmit={handleRegistration}>
          <div>
          <input
              type="text"
              placeholder="First name"
              value={firstname}
              name= "firstname"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastname}
              name= "lastname"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
          <input
              type="text"
              placeholder="Email"
              value={email}
              name= "email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              name= "phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
          <input
              type="text"
              placeholder="Adhaar Number"
              value={adhaar}
              name= "adhaar"
              onChange={(e) => setAdhaar(e.target.value)}
            />
            <input
              type="text"
              placeholder="Age"
              value={age}
              name= "age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
          <select value={gender} name='gender' onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>

          <input
              type="password"
              placeholder="Password"
              value={password}
              name= "password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              name= "confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already have an account?</p>
            <NavLink
              to={"/login"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              <strong>Login</strong>
            </NavLink>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Register