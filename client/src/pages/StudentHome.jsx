import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const StudentHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { student } = location.state || {};

  const handleLogout = () => {
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path, { state: { student } });
  };

  return (
    <div className="student-home">
      <h1>Welcome, {student.StudentName}</h1>
      <div className="main-content">
        <div className="sidebar">
          <button onClick={() => handleNavigation("/enroll")}>Enroll</button>
          <button onClick={() => handleNavigation("/drop")}>Drop</button>
          <button onClick={() => handleNavigation("/swap")}>Swap</button>
          <button onClick={() => handleNavigation("/view-schedule")}>View Schedule</button>
        </div>
        <div className="info-tab">
          <h2>Student Information</h2>
          <p><strong>Full Name:</strong> {student.StudentName}</p>
          <p><strong>Student ID:</strong> {student.StudentID}</p>
          <p><strong>Major:</strong> {student.StudentMajor}</p>
          <p><strong>School Name:</strong> {student.SchoolName}</p>
          <p><strong>School ID:</strong> {student.SchoolID}</p>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StudentHome;
