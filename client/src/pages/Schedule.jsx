import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Schedule = () => {
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const studentID = localStorage.getItem('studentID');
                const res = await axios.get(`http://localhost:3000/schedule/${studentID}`);
                setSchedule(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchSchedule();
    }, []);

    return (
        <div className="schedule-container">
            <h1>Your Schedule</h1>
            <ul>
                {schedule.map((item, index) => (
                    <li key={index}>
                        <p><strong>Course:</strong> {item.courseName}</p>
                        <p><strong>Room:</strong> {item.Room}</p>
                        <p><strong>Time:</strong> {item.Time}</p>
                        <p><strong>Days:</strong> {item.Days}</p>
                        <p><strong>Semester:</strong> {item.Semester}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Schedule;


/*
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
*/