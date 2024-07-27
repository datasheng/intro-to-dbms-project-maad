import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewSchedule = () => {
    const [courses, setCourses] = useState([]);
    const [selectedSections, setSelectedSections] = useState([]);

    useEffect(() => {
        const fetchCoursesAndSections = async () => {
            try {
                const res = await axios.get("http://localhost:3000/available-courses-sections");
                setCourses(res.data);
            } catch (err) {
                console.error("Error fetching courses and sections:", err);
            }
        };
        fetchCoursesAndSections();
    }, []);

    const handleSectionSelect = (sectionID) => {
        setSelectedSections(prevSelectedSections => {
            if (prevSelectedSections.includes(sectionID)) {
                return prevSelectedSections.filter(id => id !== sectionID);
            } else {
                return [...prevSelectedSections, sectionID];
            }
        });
    };

    const handleSaveSchedule = async () => {
        try {
            const studentID = localStorage.getItem('studentID');
            await axios.post("http://localhost:3000/save-schedule", {
                studentID,
                sections: selectedSections
            });
            alert("Schedule saved successfully");
        } catch (err) {
            console.error("Error saving schedule:", err);
        }
    };

    return (
        <div className="new-schedule-container">
            <h1>Create a New Schedule</h1>
            <ul>
                {courses.map(course => (
                    <li key={course.SectionID}>
                        {course.courseName} - Room: {course.Room}, Time: {course.Time}, Days: {course.Days}, Semester: {course.Semester}
                        <button onClick={() => handleSectionSelect(course.SectionID)}>
                            {selectedSections.includes(course.SectionID) ? "Deselect" : "Select"}
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={handleSaveSchedule}>Save Schedule</button>
        </div>
    );
};

export default NewSchedule;
