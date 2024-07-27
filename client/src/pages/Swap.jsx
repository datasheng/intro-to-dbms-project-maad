import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Swap = () => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [selectedDropCourse, setSelectedDropCourse] = useState(null);
    const [selectedEnrollCourse, setSelectedEnrollCourse] = useState(null);
    const [availableSections, setAvailableSections] = useState([]);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const studentID = localStorage.getItem('studentID');
                const res = await axios.get(`http://localhost:3000/enrolled-courses/${studentID}`);
                setEnrolledCourses(res.data);
            } catch (err) {
                console.error("Error fetching enrolled courses:", err);
            }
        };

        const fetchAllCourses = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/all-courses`);
                setAllCourses(res.data);
            } catch (err) {
                console.error("Error fetching all courses:", err);
            }
        };

        fetchEnrolledCourses();
        fetchAllCourses();
    }, []);

    const handleDropCourseSelect = (sectionID) => {
        setSelectedDropCourse(sectionID);
    };

    const handleEnrollCourseSelect = async (courseID) => {
        setSelectedEnrollCourse(courseID);
        try {
            const res = await axios.get(`http://localhost:3000/sections/${courseID}`);
            setAvailableSections(res.data);
        } catch (err) {
            console.error("Error fetching available sections:", err);
        }
    };

    const handleSwap = async (enrollSectionID) => {
        try {
            const studentID = localStorage.getItem('studentID');
            await axios.post("http://localhost:3000/swap-course", {
                studentID,
                dropSectionID: selectedDropCourse,
                enrollSectionID
            });
            alert("Swapped successfully");
            setSelectedDropCourse(null);
            setSelectedEnrollCourse(null);
            setAvailableSections([]);
            // Refresh enrolled courses
            const res = await axios.get(`http://localhost:3000/enrolled-courses/${studentID}`);
            setEnrolledCourses(res.data);
        } catch (err) {
            console.error("Error swapping courses:", err);
        }
    };

    return (
        <div className="swap-container">
            <h1>Swap a Course</h1>
            <h2>Select a course to drop:</h2>
            <ul>
                {enrolledCourses.map(course => (
                    <li key={course.SectionID}>
                        {course.courseName} - Room: {course.Room}, Time: {course.Time}, Days: {course.Days}, Semester: {course.Semester}
                        <button onClick={() => handleDropCourseSelect(course.SectionID)}>Select</button>
                    </li>
                ))}
            </ul>
            {selectedDropCourse && (
                <>
                    <h2>Select a new course to enroll:</h2>
                    <ul>
                        {allCourses.map(course => (
                            <li key={course.courseID}>
                                {course.courseName} - {course.Credit} Credits
                                <button onClick={() => handleEnrollCourseSelect(course.courseID)}>Select</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {selectedEnrollCourse && (
                <>
                    <h2>Select a section for the new course:</h2>
                    <ul>
                        {availableSections.map(section => (
                            <li key={section.SectionID}>
                                Room: {section.Room}, Time: {section.Time}, Days: {section.Days}, Semester: {section.Semester}
                                <button onClick={() => handleSwap(section.SectionID)}>Swap</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Swap;


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