import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const EnrollCourse = () => {
  const location = useLocation();
  const { student } = location.state || {};
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Fetch majors and current schedule from the backend
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
      // Fetch courses based on selected major
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

  return (
    <div className="enroll-course">
      <h1>Enroll Course</h1>
      <div className="left-section">
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
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
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
        <ul>
          {schedule.map((item, index) => (
            <li key={index}>
              {item.CourseName} - {item.Time} - {item.Days}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EnrollCourse;
