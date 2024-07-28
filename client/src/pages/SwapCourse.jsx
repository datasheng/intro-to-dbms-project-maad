// Import necessary modules from React, Axios, and React Router DOM
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

// Define the SwapCourse component
const SwapCourse = () => {
  // Get the current location and navigation functions from React Router
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the student object from the location state
  const { student } = location.state || {};

  // State variables to manage the student's schedule, selected current course, majors, selected major, courses, and selected new course
  const [schedule, setSchedule] = useState([]);
  const [selectedCurrentCourse, setSelectedCurrentCourse] = useState("");
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedNewCourse, setSelectedNewCourse] = useState("");

  // useEffect hook to fetch majors and the student's current schedule when the component mounts
  useEffect(() => {
    // Function to fetch the majors and schedule from the backend
    const fetchData = async () => {
      try {
        const majorsResponse = await axios.get("http://localhost:8800/course-majors");
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
      // Function to fetch courses based on the selected major
      const fetchCourses = async () => {
        try {
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

  // Function to handle course swapping
  const handleSwap = async () => {
    try {
      // Send a POST request to swap the current course with the new course
      await axios.post("http://localhost:8800/swap", {
        studentId: student.StudentID,
        currentCourseName: selectedCurrentCourse,
        newCourseName: selectedNewCourse,
      });
      // Refetch the updated schedule
      const updatedScheduleResponse = await axios.get(`http://localhost:8800/schedule/${student.StudentID}`);
      setSchedule(updatedScheduleResponse.data);
      // Clear the selected current and new courses
      setSelectedCurrentCourse("");
      setSelectedNewCourse("");
    } catch (error) {
      console.error("Error swapping courses:", error);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Navigate to the home page
    navigate("/");
  };

  // Render the component
  return (
    <div className="swap-course">
      {/* Button to navigate to the student home page */}
      <button className="home-button" onClick={() => navigate("/student-home", { state: { student } })}>
        Home
      </button>
      <h1>Swap Course</h1>
      <div className="left-section">
        {/* Dropdown to select the current course to swap */}
        <select
          value={selectedCurrentCourse}
          onChange={(e) => setSelectedCurrentCourse(e.target.value)}
        >
          <option value="" disabled>Select Current Course</option>
          {schedule.map((course, index) => (
            <option key={index} value={course.CourseName}>
              {course.CourseName}
            </option>
          ))}
        </select>
        {/* Dropdown to select a major */}
        <select
          value={selectedMajor}
          onChange={(e) => setSelectedMajor(e.target.value)}
        >
          <option value="" disabled>Select Major</option>
          {majors.map((major, index) => (
            <option key={index} value={major.CourseMajor}>
              {major.CourseMajor}
            </option>
          ))}
        </select>
        {/* Dropdown to select the new course */}
        <select
          value={selectedNewCourse}
          onChange={(e) => setSelectedNewCourse(e.target.value)}
        >
          <option value="" disabled>Select New Course</option>
          {courses.map((course, index) => (
            <option key={index} value={course.CourseName}>
              {course.CourseName}
            </option>
          ))}
        </select>
        {/* Button to swap the courses */}
        <button onClick={handleSwap}>Swap</button>
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

// Export the SwapCourse component as the default export
export default SwapCourse;
