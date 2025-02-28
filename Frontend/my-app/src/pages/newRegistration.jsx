import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import "./newRegistration.css"; // New CSS file

const NewRegistration = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    created_at: new Date().toISOString(),
    reservation_date: "",
    reservation_time: "",
    num_people: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (
      !userData.name ||
      !userData.email ||
      !userData.phone ||
      !userData.password ||
      !userData.reservation_date ||
      !userData.reservation_time ||
      !userData.num_people
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      await registerUser(userData);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Registration Failed! Please try again.");
    }
  };

  return (
    <div className="new-registration-container">
      <div className="new-registration-box">
        <h2>New Reservation</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={userData.phone}
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />

        <input
          type="date"
          value={userData.reservation_date}
          onChange={(e) => setUserData({ ...userData, reservation_date: e.target.value })}
        />

        <input
          type="time"
          value={userData.reservation_time}
          onChange={(e) => setUserData({ ...userData, reservation_time: e.target.value })}
        />

        <input
          type="number"
          placeholder="Number of People"
          value={userData.num_people}
          onChange={(e) => setUserData({ ...userData, num_people: e.target.value })}
        />

        {error && <p className="error-message">{error}</p>}

        <button onClick={handleRegister}>Book Reservation</button>

        <p>
          Already registered? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default NewRegistration;
