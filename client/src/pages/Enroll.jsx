import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Enroll = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get('http://localhost:3000/course');
                setCourses(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourses();
    }, []);

    const handleEnroll = async (courseID) => {
        // Logic to enroll in a course
    };

    return (
        <div className="enroll-container">
            <h1>Enroll in a Course</h1>
            <ul>
                {courses.map(course => (
                    <li key={course.courseID}>
                        {course.courseName} - {course.Credit} Credits
                        <button onClick={() => handleEnroll(course.courseID)}>Enroll</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Enroll;
