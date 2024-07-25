import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import './Courses.css'; // Assuming you have a CSS file for styling

const Course = () => {
    const [course, setCourse] = useState([]);

    useEffect(() => {
        const fetchAllCourse = async () => {
            try {
                const res = await axios.get("http://localhost:3000/course");
                console.log('API Response:', res.data);  // Debugging line
                setCourse(res.data);  // Set the fetched data to the courses state
            } catch (err) {
                console.log('API Fetch Error:', err);
            }
        }
        fetchAllCourse();
    }, []);

    return (
        <div className="course-container">
            <header className="course-header">
                <h1>Course</h1>
            </header>
            <ul className="course-list">
                {course.map(cours => (
                    <li key={cours.courseID} className="course-item">
                        <Link to={`/course/${cours.courseID}`}>
                            {cours.courseName} - {cours.Credit} credits
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Course;
