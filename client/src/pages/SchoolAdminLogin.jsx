import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SchoolAdminLogin = () => {
  const [schoolName, setSchoolName] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [licenseId, setLicenseId] = useState("");
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch schools from the backend
    const fetchData = async () => {
      try {
        const schoolsResponse = await axios.get("http://localhost:8800/schools");
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
      const response = await axios.post("http://localhost:8800/admin-login", {
        schoolName,
        schoolId,
        licenseId,
      });
      console.log("Admin login response", response.data);
      if (response.data.success) {
        navigate("/school-admin-home", { state: { admin: response.data.admin } });
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="school-admin-login">
      <h1 className="title">School Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="SchoolID"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="LicenseID"
          value={licenseId}
          onChange={(e) => setLicenseId(e.target.value)}
          required
        />
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
        className="student-login-button"
        onClick={() => navigate("/")}
      >
        Student Login
      </button>
    </div>
  );
};

export default SchoolAdminLogin;
