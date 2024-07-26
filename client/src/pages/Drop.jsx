import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Drop = ({ studentID }) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/student/${studentID}/courses`);
                setCourses(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourses();
    }, [studentID]);

    const handleDrop = async () => {
        try {
            await axios.post(`http://localhost:3000/student/${studentID}/drop`, { sectionID: selectedCourse });
            setCourses(courses.filter(course => course.SectionID !== selectedCourse));
            setSelectedCourse('');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="drop-container">
            <header className="drop-header">
                <h1>Drop Course</h1>
            </header>
            <div className="drop-content">
                <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                    <option value="">Select a course to drop</option>
                    {courses.map(course => (
                        <option key={course.SectionID} value={course.SectionID}>
                            {course.CourseName}
                        </option>
                    ))}
                </select>
                <button onClick={handleDrop} disabled={!selectedCourse}>Drop</button>
            </div>
        </div>
    );
};

export default Drop;

