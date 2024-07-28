import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const EnrollCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student } = location.state || {};
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const majorsResponse = await axios.get("http://localhost:8800/course-majors");
        const scheduleResponse = await axios.get(`http://localhost:8800/schedule/${student.StudentID}`);
        setMajors(majorsResponse.data);
        setSchedule(scheduleResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [student.StudentID]);

  useEffect(() => {
    if (selectedMajor) {
      const fetchCourses = async () => {
        try {
          const response = await axios.get(`http://localhost:8800/courses/${selectedMajor}`);
          setCourses(response.data);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };

      fetchCourses();
    }
  }, [selectedMajor]);

  const handleEnroll = async () => {
    try {
      const response = await axios.post("http://localhost:8800/enroll", {
        studentId: student.StudentID,
        courseName: selectedCourse,
      });
      setSchedule([...schedule, response.data]);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="enroll-course">
      <button className="home-button" onClick={() => navigate("/student-home", { state: { student } })}>
        Home
      </button>
      <h1>Enroll Course</h1>
      <div className="left-section">
        <select value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)}>
          <option value="" disabled>Select Major</option>
          {majors.map((major, index) => (
            <option key={index} value={major.CourseMajor}>
              {major.CourseMajor}
            </option>
          ))}
        </select>
        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="" disabled>Select Course</option>
          {courses.map((course, index) => (
            <option key={index} value={course.CourseName}>
              {course.CourseName}
            </option>
          ))}
        </select>
        <button onClick={handleEnroll}>Enroll</button>
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

export default EnrollCourse;
