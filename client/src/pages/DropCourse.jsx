import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const DropCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = location.state || {};
  const [schedule, setSchedule] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    // Fetch current schedule from the backend
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/schedule/${student.StudentID}`);
        setSchedule(response.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, [student.StudentID]);

  const handleDrop = async () => {
    try {
      await axios.post("http://localhost:8800/drop", {
        studentId: student.StudentID,
        courseName: selectedCourse,
      });
      setSchedule(schedule.filter(course => course.CourseName !== selectedCourse));
      setSelectedCourse("");
    } catch (error) {
      console.error("Error dropping course:", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="drop-course">
      <button className="home-button" onClick={() => navigate("/student-home", { state: { student } })}>
        Home
      </button>
      <h1>Drop Course</h1>
      <div className="left-section">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="" disabled>Select Course</option>
          {schedule.map((course, index) => (
            <option key={index} value={course.CourseName}>
              {course.CourseName}
            </option>
          ))}
        </select>
        <button onClick={handleDrop}>Drop</button>
      </div>
<div className="right-section">
        <h2>Current Schedule</h2>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Room</th>
              <th>Section</th>
              <th>Days</th>
              <th>Time</th>
              <th>Semester</th>
              <th>Teacher Name</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index}>
                <td>{item.CourseName}</td>
                <td>{item.Room}</td>
                <td>{item.SectionID}</td>
                <td>{item.Days}</td>
                <td>{item.Time}</td>
                <td>{item.Semester}</td>
                <td>{item.TeacherName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DropCourse;
