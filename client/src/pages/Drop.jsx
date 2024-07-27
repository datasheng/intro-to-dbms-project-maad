import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Drop = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const studentID = localStorage.getItem('studentID');
                console.log("Fetching enrolled courses for student ID:", studentID); // Debug log
                const res = await axios.get(`http://localhost:3000/enrolled-courses/${studentID}`);
                console.log("Fetched enrolled courses:", res.data); // Debug log
                setEnrolledCourses(res.data);
            } catch (err) {
                console.error("Error fetching enrolled courses:", err); // Debug log
            }
        };
        fetchEnrolledCourses();
    }, []);

    const handleDropCourse = async (sectionID) => {
        try {
            const studentID = localStorage.getItem('studentID');
            await axios.post("http://localhost:3000/drop-course", {
                studentID,
                sectionID
            });
            alert("Dropped successfully");
            setEnrolledCourses(enrolledCourses.filter(course => course.SectionID !== sectionID));
        } catch (err) {
            console.error("Error dropping course:", err); // Debug log
        }
    };

    return (
        <div className="drop-container">
            <h1>Drop a Course</h1>
            <ul>
                {enrolledCourses.map(course => (
                    <li key={course.SectionID}>
                        {course.courseName} - Room: {course.Room}, Time: {course.Time}, Days: {course.Days}, Semester: {course.Semester}
                        <button onClick={() => handleDropCourse(course.SectionID)}>Drop</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Drop;


