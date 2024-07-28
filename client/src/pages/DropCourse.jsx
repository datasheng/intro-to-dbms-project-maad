// Import necessary modules from React, Axios, and React Router DOM
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Define the DropCourse component
const DropCourse = () => {
  // Get the current location and navigation functions from React Router
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the student object from the location state
  const { student } = location.state || {};

  // State variables to manage the student's schedule and the selected course to drop
  const [schedule, setSchedule] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  // useEffect hook to fetch the student's current schedule when the component mounts
  useEffect(() => {
    // Function to fetch the schedule from the backend
    const fetchSchedule = async () => {
      try {
        // Fetch the student's current schedule using their StudentID
        const response = await axios.get(`http://localhost:8800/schedule/${student.StudentID}`);
        // Update the state with the fetched schedule
        setSchedule(response.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };

    fetchSchedule();
  }, [student.StudentID]);

  // Function to handle dropping a course
  const handleDrop = async () => {
    try {
      // Send a POST request to drop the selected course
      await axios.post("http://localhost:8800/drop", {
        studentId: student.StudentID,
        courseName: selectedCourse,
      });
      // Update the schedule to remove the dropped course
      setSchedule(schedule.filter(course => course.CourseName !== selectedCourse));
      // Clear the selected course
      setSelectedCourse("");
    } catch (error) {
      console.error("Error dropping course:", error);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Navigate to the home page
    navigate("/");
  };

  // Render the component
  return (
    <div className="drop-course">
      {/* Button to navigate to the student home page */}
      <button className="home-button" onClick={() => navigate("/student-home", { state: { student } })}>
        Home
      </button>
      <h1>Drop Course</h1>
      <div className="left-section">
        {/* Dropdown to select a course to drop */}
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
        {/* Button to drop the selected course */}
        <button onClick={handleDrop}>Drop</button>
      </div>
      <div className="right-section">
        <h2>Current Schedule</h2>
        {/* Table to display the student's current schedule */}
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
      {/* Button to logout */}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Export the DropCourse component as the default export
export default DropCourse;
