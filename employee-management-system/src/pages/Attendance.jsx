import React, { useEffect, useState } from "react";
import "./Attendance.css";

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const [markedIds, setMarkedIds] = useState({}); // Stores empid: status
  const [successMessage, setSuccessMessage] = useState("");

  const todayDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  useEffect(() => {
    // Fetch active employees
    fetch("http://localhost:5000/api/employees/status/active")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Failed to fetch employees:", err));

    // Fetch today's marked attendance with status
    fetch("http://localhost:5000/api/attendance/today")
      .then((res) => res.json())
      .then((data) => {
        const statusMap = {};
        data.forEach((entry) => {
          statusMap[entry.empid] = entry.status;
        });
        setMarkedIds(statusMap);
      })
      .catch((err) => console.error("Failed to fetch today's attendance:", err));
  }, []);

  const openPopup = (emp) => {
    setSelectedEmp(emp);
    setStatus("");
    setReason("");
  };

  const closePopup = () => {
    setSelectedEmp(null);
  };

  const submitAttendance = () => {
    if (!status) return alert("Please select status");

    const attendanceData = {
      empid: selectedEmp.empid,
      name: selectedEmp.name,
      date: todayDate,
      status,
      reason: status === "Leave" ? reason : ""
    };

    fetch("http://localhost:5000/api/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attendanceData)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) alert(data.error);
        else {
          // Update attendance status map
          setMarkedIds({
            ...markedIds,
            [selectedEmp.empid]: status
          });

          setSuccessMessage("✅ Attendance marked successfully!");
          closePopup();

          // Clear message after 3 seconds
          setTimeout(() => setSuccessMessage(""), 3000);
        }
      })
      .catch((err) => console.error("Failed to save attendance:", err));
  };

  // Helper to get status icon
  const getStatusIcon = (status) => {
    if (status === "Present") return "✅";
    if (status === "Absent") return "❌";
    if (status === "Leave") return "🟡";
    return "⏳"; // Not yet marked
  };

  return (
    <>
      <div className="att-title">EMPLOYEE ATTENDANCE MANAGEMENT</div>
      <div className="att-subtitle">
        ATTENDANCE FOR THE DATE: <strong>{todayDate}</strong>
      </div>

      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const attendanceStatus = markedIds[emp.empid];
              const statusIcon = getStatusIcon(attendanceStatus);
              const isDisabled = attendanceStatus !== undefined;

              return (
                <tr key={emp.empid}>
                  <td>
                    <button
                      className={`empid-btn ${isDisabled ? "disabled" : ""}`}
                      onClick={() => !isDisabled && openPopup(emp)}
                      disabled={isDisabled}
                    >
                      {emp.empid} {statusIcon}
                    </button>
                  </td>
                  <td>{emp.name}</td>
                  <td>{emp.designation}</td>
                  <td>{emp.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {successMessage && (
        <div className="success-msg">{successMessage}</div>
      )}

      {/* Popup Modal */}
      {selectedEmp && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Mark Attendance</h3>
            <p><strong>Emp ID:</strong> {selectedEmp.empid}</p>
            <p><strong>Name:</strong> {selectedEmp.name}</p>
            <p><strong>Date:</strong> {todayDate}</p>

            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">--Select--</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>

            {status === "Leave" && (
              <>
                <label>Reason:</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </>
            )}

            <div className="popup-buttons">
              <button onClick={submitAttendance}>Submit</button>
              <button onClick={closePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Attendance;
