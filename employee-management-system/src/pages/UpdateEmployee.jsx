import React, { useState } from 'react';
import "./UpdateEmployee.css";

const UpdateEmployee = () => {
  const [empid, setEmpid] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [isFetched, setIsFetched] = useState(false); // Track fetch state

  // Fetch employee by empid
  const fetchEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${empid}`);
      if (!response.ok) {
        alert("❌ Employee not found");
        return;
      }
      const data = await response.json();
      setEmployeeData(data);
      setIsFetched(true); // Make empid input readonly
    } catch (error) {
      console.error("❌ Error fetching employee:", error);
      alert("❌ Server error while fetching employee");
    }
  };

  // Handle input changes in employeeData
  const handleChange = (e) => {
    const { id, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Update employee data
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${empid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Employee updated successfully!");
        window.location.reload();
      } else {
        alert("❌ Update failed: " + result.error);
      }
    } catch (error) {
      console.error("❌ Update error:", error);
      alert("❌ Server error while updating");
    }
  };

  // Delete employee
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/employees/${empid}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("🗑️ Employee deleted successfully");
        window.location.reload();
      } else {
        alert("❌ Delete failed");
      }
    } catch (error) {
      console.error("❌ Delete error:", error);
      alert("❌ Server error while deleting");
    }
  };

  return (
    <>
      <div className='title'>UPDATE EMPLOYEE DETAILS</div>

      {/* Search by empid */}
      <div className="main">
        <label className='empid' htmlFor="empid">Employee ID</label>
        <input
          type="text"
          id="empid"
          placeholder="Enter the Emp ID"
          value={empid}
          onChange={(e) => setEmpid(e.target.value)}
          required
          readOnly={isFetched} // <-- Disable editing after fetch
        />
        <button className="fetct-btn" type="button" onClick={fetchEmployee}>Fetch Details</button>
      </div>

      {/* Display editable form if data is fetched */}
      {employeeData && (
        <form className="emp-details">
          <div className="emp-name">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={employeeData.name} onChange={handleChange} />
          </div>

          <div className="emp-mobile">
            <label htmlFor="mobile">Mobile</label>
            <input id="mobile" type="tel" value={employeeData.mobile} onChange={handleChange} />
          </div>

          <div className="emp-dob">
            <label htmlFor="dob">Date of Birth</label>
            <input id="dob" type="date" value={employeeData.dob?.slice(0, 10)} onChange={handleChange} />
          </div>

          <div className="emp-gender">
            <label htmlFor="gender">Gender</label>
            <select id="gender" value={employeeData.gender} onChange={handleChange}>
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="emp-idtype">
            <label htmlFor="idtype">ID Type</label>
            <select id="idtype" value={employeeData.idtype} onChange={handleChange}>
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
            <input id="idnum" type="text" value={employeeData.idnum} onChange={handleChange} />
          </div>

          <div className="emp-designation">
            <label htmlFor="designation">Designation</label>
            <input id="designation" type="text" value={employeeData.designation} onChange={handleChange} />
          </div>

          <div className="emp-doj">
            <label htmlFor="doj">Date of Joining</label>
            <input id="doj" type="date" value={employeeData.doj?.slice(0, 10)} onChange={handleChange} />
          </div>

          <div className="emp-exp">
            <label htmlFor="experience">Experience</label>
            <input id="experience" type="number" value={employeeData.experience} onChange={handleChange} />
          </div>

          <div className="emp-salary">
            <label htmlFor="salary">Salary</label>
            <input id="salary" type="number" value={employeeData.salary} onChange={handleChange} />
          </div>

          <div className="emp-marital">
            <label htmlFor="maritalStatus">Marital Status</label>
            <select id="maritalStatus" value={employeeData.maritalStatus} onChange={handleChange}>
              <option value="">--Select--</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="emp-status">
            <label htmlFor="status">Status</label>
            <select id="status" value={employeeData.status} onChange={handleChange}>
              <option value="">--Select--</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="emp-address">
            <label htmlFor="address">Address</label>
            <textarea id="address" rows="2" value={employeeData.address} onChange={handleChange} />
          </div>
          <div className="emp-actions">
            <button type="button" className="submit-btn" onClick={handleUpdate}>Update</button>
            <button type="button" className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateEmployee;
