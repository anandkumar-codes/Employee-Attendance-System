import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Format date: dd-mm-yyyy (Tuesday)
  const formattedDate = `${String(currentTime.getDate()).padStart(2, '0')}-${String(currentTime.getMonth() + 1).padStart(2, '0')}-${currentTime.getFullYear()} (${currentTime.toLocaleDateString('en-US', { weekday: 'long' })})`;

  // Format time: hh:mm:ss AM/PM
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="landing-container">
      <h1>EMPLOYEE MANAGEMENT SYSTEM</h1> <br />
      
      <h2 style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", background: "#073b4c", color: "white" }}>
        <span>{formattedDate}</span>
        <span>{formattedTime}</span>
      </h2>

      <div className="btns">
        <button className="b1" onClick={() => navigate("/register")}>REGISTER EMPLOYEE</button>
        <button className="b2" onClick={() => navigate("/update")}>UPDATE EMPLOYEE</button>
        <button className="b3" onClick={() => navigate("/attendance")}>EMPLOYEE ATTENDANCE</button>
      </div>
    </div>
  );
};

export default LandingPage;
