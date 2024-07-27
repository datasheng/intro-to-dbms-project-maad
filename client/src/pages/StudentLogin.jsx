import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLogin = () => {
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");
  const [majors, setMajors] = useState([]);
  const [schoolName, setSchoolName] = useState("");
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch majors and schools from the backend
    const fetchData = async () => {
      try {
        const majorsResponse = await axios.get("http://localhost:8800/majors");
        const schoolsResponse = await axios.get("http://localhost:8800/schools");
        setMajors(majorsResponse.data);
        setSchools(schoolsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/student-login", {
        studentName,
        studentId,
        major,
        schoolName,
      });
      if (response.data.success) {
        navigate("/student-home", { state: { student: response.data.student } });
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="student-login">
      <h1 className="title">Student Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="StudentName"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="StudentID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <select
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          required
        >
          <option value="">Select Major</option>
          {majors.map((major, index) => (
            <option key={index} value={major.StudentMajor}>
              {major.StudentMajor}
            </option>
          ))}
        </select>
        <select
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          required
        >
          <option value="">Select School</option>
          {schools.map((school, index) => (
            <option key={index} value={school.SchoolName}>
              {school.SchoolName}
            </option>
          ))}
        </select>
        <button type="submit">Login</button>
      </form>
      <button
        className="admin-login-button"
        onClick={() => navigate("/school-admin-login")}
      >
        School Admin Login
      </button>
    </div>
  );
};

export default StudentLogin;
