import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Enroll = () => {
    const [courses, setCourses] = useState([]);
    const [sections, setSections] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const studentID = localStorage.getItem('studentID');
                console.log("Student ID from localStorage:", studentID); // Debug log
                const res = await axios.get(`http://localhost:3000/available-courses/${studentID}`);
                console.log("Response from available-courses API:", res.data); // Debug log
                setCourses(res.data);
            } catch (err) {
                console.error("Error fetching courses:", err); // Debug log
            }
        };
        fetchCourses();
    }, []);

    const handleCourseSelect = async (courseID) => {
        setSelectedCourse(courseID);
        try {
            const res = await axios.get(`http://localhost:3000/sections/${courseID}`);
            console.log("Response from sections API:", res.data); // Debug log
            setSections(res.data);
        } catch (err) {
            console.error("Error fetching sections:", err); // Debug log
        }
    };

    const handleEnroll = async () => {
        try {
            const studentID = localStorage.getItem('studentID');
            await axios.post("http://localhost:3000/enroll", {
                studentID,
                courseID: selectedCourse,
                sectionID: selectedSection
            });
            alert("Enrolled successfully");
        } catch (err) {
            console.error("Error enrolling:", err); // Debug log
        }
    };

    return (
        <div className="enroll-container">
            <h1>Enroll in a Course</h1>
            <ul>
                {courses.map(course => (
                    <li key={course.courseID}>
                        {course.courseName} - {course.Credit} Credits
                        <button onClick={() => handleCourseSelect(course.courseID)}>Select</button>
                    </li>
                ))}
            </ul>
            {selectedCourse && (
                <div>
                    <h2>Select Section</h2>
                    <ul>
                        {sections.map(section => (
                            <li key={section.SectionID}>
                                Room: {section.Room}, Time: {section.Time}, Days: {section.Days}, Semester: {section.Semester}
                                <button onClick={() => setSelectedSection(section.SectionID)}>Select</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedSection && (
                <button onClick={handleEnroll}>Enroll in Selected Section</button>
            )}
        </div>
    );
};

export default Enroll;


/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Enroll = () => {
    const [courses, setCourses] = useState([]);
    const [sections, setSections] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const studentID = localStorage.getItem('studentID');
                const res = await axios.get(`http://localhost:3000/available-courses/${studentID}`);
                setCourses(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchCourses();
    }, []);

    const handleCourseSelect = async (courseID) => {
        setSelectedCourse(courseID);
        try {
            const res = await axios.get(`http://localhost:3000/sections/${courseID}`);
            setSections(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEnroll = async () => {
        try {
            const studentID = localStorage.getItem('studentID');
            await axios.post("http://localhost:3000/enroll", {
                studentID,
                courseID: selectedCourse,
                sectionID: selectedSection
            });
            alert("Enrolled successfully");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="enroll-container">
            <h1>Enroll in a Course</h1>
            <ul>
                {courses.map(course => (
                    <li key={course.courseID}>
                        {course.courseName} - {course.Credit} Credits
                        <button onClick={() => handleCourseSelect(course.courseID)}>Select</button>
                    </li>
                ))}
            </ul>
            {selectedCourse && (
                <div>
                    <h2>Select Section</h2>
                    <ul>
                        {sections.map(section => (
                            <li key={section.SectionID}>
                                Room: {section.Room}, Time: {section.Time}, Days: {section.Days}, Semester: {section.Semester}
                                <button onClick={() => setSelectedSection(section.SectionID)}>Select</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedSection && (
                <button onClick={handleEnroll}>Enroll in Selected Section</button>
            )}
        </div>
    );
};

export default Enroll;
*/
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