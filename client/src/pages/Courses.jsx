import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import './Courses.css'; // Assuming you have a CSS file for styling

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const res = await axios.get("http://localhost:3000/courses");
                console.log('API Response:', res.data);  // Debugging line
                setCourses(res.data);  // Set the fetched data to the courses state
            } catch (err) {
                console.log('API Fetch Error:', err);
            }
        }
        fetchAllCourses();
    }, []);

    return (
        <div className="courses-container">
            <header className="courses-header">
                <h1>Courses</h1>
            </header>
            <ul className="courses-list">
                {courses.map(course => (
                    <li key={course.CourseID} className="course-item">
                        <Link to={`/courses/${course.CourseID}`}>
                            {course.CourseName} - {course.Credits} credits
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Courses;
