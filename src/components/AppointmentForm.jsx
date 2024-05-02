import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const navigate = useNavigate();
  const {isAuthenticated, setIsAuthenticated } = useContext(AppContext);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adhaar, setAdhaar] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstname, setDoctorFirstname] = useState("");
  const [doctorLastname, setDoctorLastname] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await fetch("https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/doctors", {
        method: "GET",
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error("Something went wrong...");
      }
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const response = await fetch(
        "https://doctor-appointment-booking-website-o8qj.onrender.com/api/v1/bookAppointment",
        {
          method: "POST",
          body: JSON.stringify({
            firstname,
            lastname,
            email,
            phone,
            gender,
            age,
            adhaar,
            appointmentDate,
            department,
            doctorFirstname,
            doctorLastname,
            hasVisited: hasVisitedBool,
            address,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${localStorage.getItem("token")}`
          }
        }
      );
      const data = await response.json();
      if (response.ok) {
          setFirstname(""),
          setLastname(""),
          setEmail(""),
          setPhone(""),
          setAdhaar(""),
          setAge(""),
          setGender(""),
          setAppointmentDate(""),
          setDepartment(""),
          setDoctorFirstname(""),
          setDoctorLastname(""),
          setHasVisited(false),
          setAddress("");
          navigate("/")
          toast.success(data.message);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error in appointment page ", error);
    }
  };
  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Book Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First name"
              value={firstname}
              name="firstname"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastname}
              name="lastname"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Adhaar Number"
              value={adhaar}
              name="adhaar"
              onChange={(e) => setAdhaar(e.target.value)}
            />
            <input
              type="text"
              placeholder="Age"
              value={age}
              name="age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <select
              value={gender}
              name="gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>

            <input
              type="date"
              placeholder="Appointment date"
              value={appointmentDate}
              name="appointmentDate"
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
          </div>
          <div>
            <select
              name="department"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstname("");
                setDoctorLastname("");
              }}
            >
              <option value="">Select Department</option>
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={`${doctorFirstname} ${doctorLastname}`}
              onChange={(e) => {
                const [firstname, lastname] = e.target.value.split(" ");
                setDoctorFirstname(firstname);
                setDoctorLastname(lastname);
              }}
              disabled={!department} //this will make sure that the user cant choose docorts untill selecting department
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstname} ${doctor.lastname}`}
                    key={index}
                  >
                    {doctor.firstname} {doctor.lastname}
                  </option>
                ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />

          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>
              <strong>Have you visited before?</strong>
            </p>
            <input
              type="checkbox"
              name="hasVisited"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>

          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Book Appointment</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
