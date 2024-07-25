import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Instructors = () => {
    const [instructor, setInstructor] = useState([]);

    useEffect(() => {
        const fetchAllInstructor = async () => {
            try {
                const res = await axios.get("http://localhost:3000/instructor");
                console.log('API Response:', res.data);  // Debugging line
                setInstructor(res.data);  // Set the fetched data to the instructors state
            } catch (err) {
                console.log('API Fetch Error:', err);
            }
        }
        fetchAllInstructor();
    }, []);

    return (
        <div className="instructor-container">
            <header className="instructor-header">
                <h1>Instructor</h1>
            </header>
            <ul className="instructor-list">
                {instructor.map(instructor => (
                    <li key={instructor.teacherID} className="instructor-item">
                        <Link to={`/instructor/${instructor.teacherID}`}>
                            {instructor.Name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Instructors;



/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import './Instructors.css'; // Assuming you have a CSS file for styling

const Instructors = () => {
    const [instructor, setInstructor] = useState([]);

    useEffect(() => {
        const fetchAllInstructor = async () => {
            try {
                const res = await axios.get("http://localhost:3000/instructor");
                console.log('API Response:', res.data);  // Debugging line
                setInstructor(res.data);  // Set the fetched data to the instructors state
            } catch (err) {
                console.log('API Fetch Error:', err);
            }
        }
        fetchAllInstructor();
    }, []);

    return (
        <div className="instructor-container">
            <header className="instructor-header">
                <h1>Instructors</h1>
            </header>
            <ul className="instructor-list">
                {instructor.map(instructor => (
                    <li key={instructor.TeacherID} className="instructor-item">
                        <Link to={`/instructor/${instructor.TeacherID}`}>
                            {instructor.Name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Instructors;
*/