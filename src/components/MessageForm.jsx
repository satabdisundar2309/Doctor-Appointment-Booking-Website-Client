import React, { useState } from "react";
import {toast} from 'react-toastify'

const MessageForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/sendMessage", {
        method: "POST",
        body: JSON.stringify({ firstname, lastname, phone, email, message }),
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await response.json();
      if(response.ok){
        toast.success(data.message)
        setEmail("")
        setFirstname("")
        setLastname("")
        setMessage("")
        setPhone("")
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log("Error in message form components", error);
    }
  };

  return (
    <div className="container form-component message-form">
      <h2>Send us a message</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstname"
            value={firstname}
            placeholder="First name"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
          <input
            type="text"
            name="lastname"
            value={lastname}
            placeholder="Last name"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="text"
            name="phone"
            value={phone}
            placeholder="Phone number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </div>
        <textarea
          name="message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          rows={7}
          placeholder="Message"
        />
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
