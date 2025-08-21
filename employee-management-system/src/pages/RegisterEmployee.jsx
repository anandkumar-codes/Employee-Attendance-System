import React, { useState } from "react";
import "./RegisterEmployee.css";

const generateEmpId = () => {
  return "EMP" + Math.floor(100000 + Math.random() * 900000);
};

const RegisterEmployee = () => {
  const [formData, setFormData] = useState({
    empid: generateEmpId(),
    name: "",
    mobile: "",
    dob: "",
    gender: "",
    idtype: "",
    idnum: "",
    designation: "",
    doj: "",
    experience: "",
    salary: "",
    maritalStatus: "",
    status: "",
    address: "",
  });

  // Handles input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Employee registered successfully!");
        setFormData({
          empid: generateEmpId(),
          name: "",
          mobile: "",
          dob: "",
          gender: "",
          idtype: "",
          idnum: "",
          designation: "",
          doj: "",
          experience: "",
          salary: "",
          maritalStatus: "",
          status: "",
          address: "",
        });
      } else {
        alert("❌ Registration failed: " + result.error);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ Server error. Please try again.");
    }
  };

  return (
    <>
      <div className="title">REGISTER NEW EMPLOYEE</div>
      <form className="emp-details" onSubmit={handleSubmit}>
        <div className="emp-id">
          <label htmlFor="empid">Employee ID</label>
          <input id="empid" type="text" value={formData.empid} onChange={handleChange} required readOnly/>
        </div>

        <div className="emp-name">
          <label htmlFor="name">Employee Name</label>
          <input id="name" type="text" value={formData.name} onChange={handleChange} required/>
        </div>

        <div className="emp-mobile">
          <label htmlFor="mobile">Mobile Number</label>
          <input id="mobile" type="tel" value={formData.mobile} maxLength="10" inputMode="numeric" onChange={handleChange} required/>
        </div>

        <div className="emp-dob">
          <label htmlFor="dob">Date of Birth</label>
          <input id="dob" type="date" value={formData.dob} onChange={handleChange} required/>
        </div>

        <div className="emp-gender">
          <label htmlFor="gender">Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">--Select--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="emp-idtype">
          <label htmlFor="idtype">ID Type</label>
          <select id="idtype" value={formData.idtype} onChange={handleChange} required>
            <option value="">--Select--</option>
            <option value="Aadhar">Aadhar</option>
            <option value="PAN">PAN Card</option>
            <option value="License">Driving License</option>
            <option value="Passport">Passport</option>
            <option value="Voter ID">Voter ID</option>
          </select>
        </div>

        <div className="emp-idnum">
          <label htmlFor="idnum">ID Number</label>
          <input id="idnum" type="text" value={formData.idnum} onChange={handleChange} required/>
        </div>

        <div className="emp-designation">
          <label htmlFor="designation">Designation</label>
          <input id="designation" type="text" value={formData.designation} onChange={handleChange} required/>
        </div>

        <div className="emp-doj">
          <label htmlFor="doj">Date of Joining</label>
          <input id="doj" type="date" value={formData.doj} onChange={handleChange} required/>
        </div>

        <div className="emp-exp">
          <label htmlFor="experience">Experience</label>
          <input id="experience" type="number" min="0" value={formData.experience} onChange={handleChange} required/>
        </div>

        <div className="emp-salary">
          <label htmlFor="salary">Salary</label>
          <input id="salary" type="number" min="0" value={formData.salary} onChange={handleChange} required/>
        </div>

        <div className="emp-marital">
          <label htmlFor="maritalStatus">Marital Status</label>
          <select id="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required>
            <option value="">--Select--</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="emp-status">
          <label htmlFor="status">Status</label>
          <select id="status" value={formData.status} onChange={handleChange} required>
            <option value="">--Select--</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="emp-address">
          <label htmlFor="address">Address</label>
          <textarea id="address" rows="3" value={formData.address} onChange={handleChange} required></textarea>
        </div>

        <div className="emp-submit">
          <button className="submit-btn" type="submit">Register Employee</button>
        </div>
      </form>
    </>
  );
};

export default RegisterEmployee;
