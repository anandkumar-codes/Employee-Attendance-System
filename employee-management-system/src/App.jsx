import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterEmployee from "./pages/RegisterEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterEmployee />} />
        <Route path="/update" element={<UpdateEmployee />} />
        <Route path="/attendance" element={<Attendance />} />
      </Routes>
    </Router>
  );
}

export default App;
