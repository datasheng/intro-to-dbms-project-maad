import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import './Instructors.css'; // Assuming you have a CSS file for styling

const Instructors = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        const fetchAllInstructors = async () => {
            try {
                const res = await axios.get("http://localhost:3000/instructors");
                console.log('API Response:', res.data);  // Debugging line
                setInstructors(res.data);  // Set the fetched data to the instructors state
            } catch (err) {
                console.log('API Fetch Error:', err);
            }
        }
        fetchAllInstructors();
    }, []);

    return (
        <div className="instructors-container">
            <header className="instructors-header">
                <h1>Instructors</h1>
            </header>
            <ul className="instructors-list">
                {instructors.map(instructor => (
                    <li key={instructor.TeacherID} className="instructor-item">
                        <Link to={`/instructors/${instructor.TeacherID}`}>
                            {instructor.Name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Instructors;
