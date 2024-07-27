import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SchoolAdminHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin } = location.state || {};
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch students from the admin's school
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/students/${admin.SchoolID}`);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [admin.SchoolID]);

  const handleLogout = () => {
    navigate("/school-admin-login");
  };

  return (
    <div className="school-admin-home">
      <h1>Welcome, {admin.SchoolName} Administrator</h1>
      <div className="main-content">
        <div className="students-tab">
          <h2>Students</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Major</th>
                <th>School</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.StudentName}</td>
                  <td>{student.StudentID}</td>
                  <td>{student.StudentMajor}</td>
                  <td>{student.SchoolName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="info-tab">
          <h2>School Information</h2>
          <p><strong>School Name:</strong> {admin.SchoolName}</p>
          <p><strong>School ID:</strong> {admin.SchoolID}</p>
          <p><strong>License ID:</strong> {admin.LicenseID}</p>
          <p><strong>Balance:</strong> {admin.Balance}</p>
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SchoolAdminHome;
