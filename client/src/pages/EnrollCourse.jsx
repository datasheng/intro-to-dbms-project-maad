// Import necessary modules from React, Axios, and React Router DOM
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Define the EnrollCourse component
const EnrollCourse = () => {
  // Get the current location and navigation functions from React Router
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the student object from the location state
  const { student } = location.state || {};

  // State variables to manage majors, selected major, courses, selected course, and the student's schedule
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [schedule, setSchedule] = useState([]);

  // useEffect hook to fetch majors and the student's current schedule when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the list of majors
        const majorsResponse = await axios.get("http://localhost:8800/course-majors");
        // Fetch the student's current schedule using their StudentID
        const scheduleResponse = await axios.get(`http://localhost:8800/schedule/${student.StudentID}`);
        // Update the state with the fetched data
        setMajors(majorsResponse.data);
        setSchedule(scheduleResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [student.StudentID]);

  // useEffect hook to fetch courses when a major is selected
  useEffect(() => {
    if (selectedMajor) {
      const fetchCourses = async () => {
        try {
          // Fetch the list of courses for the selected major
          const response = await axios.get(`http://localhost:8800/courses/${selectedMajor}`);
          // Update the state with the fetched courses
          setCourses(response.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      fetchCourses();
    }
  }, [selectedMajor]);

  // Function to handle course enrollment
  const handleEnroll = async () => {
    try {
      // Send a POST request to enroll the student in the selected course
      const response = await axios.post("http://localhost:8800/enroll", {
        studentId: student.StudentID,
        courseName: selectedCourse,
      });
      // Update the schedule with the newly enrolled course
      setSchedule([...schedule, response.data]);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Navigate to the home page
    navigate("/");
  };

  // Render the component
  return (
    <div className="enroll-course">
      <button className="home-button" onClick={() => navigate("/student-home", { state: { student } })}>
        Home
      </button>
      <h1>Enroll Course</h1>
      <div className="left-section">
        {/* Dropdown to select a major */}
        <select value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)}>
          <option value="" disabled>Select Major</option>
          {majors.map((major, index) => (
            <option key={index} value={major.CourseMajor}>
              {major.CourseMajor}
            </option>
          ))}
        </select>
        {/* Dropdown to select a course */}
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="" disabled>Select Course</option>
          {courses.map((course, index) => (
            <option key={index} value={course.CourseName}>
              {course.CourseName}
            </option>
          ))}
        </select>
        {/* Button to enroll in the selected course */}
        <button onClick={handleEnroll}>Enroll</button>
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

// Export the EnrollCourse component as the default export
export default EnrollCourse;
