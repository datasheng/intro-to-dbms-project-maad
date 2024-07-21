import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import './Students.css'; // Assuming you have a CSS file for styling

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchAllStudents = async () => {
            try {
                const res = await axios.get("http://localhost:3000/students");
                console.log('API Response:', res.data);  // Debugging line
                setStudents(res.data);  // Set the fetched data to the students state
            } catch (err) {
                console.log('API Fetch Error:', err);
            }
        }
        fetchAllStudents();
    }, []);

    return (
        <div className="students-container">
            <header className="students-header">
                <h1>Students</h1>
            </header>
            <ul className="students-list">
                {students.map(student => (
                    <li key={student.StudentID} className="student-item">
                        <Link to={`/students/${student.StudentID}`}>
                            {student.Name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Students;


/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import './Students.css'; // Assuming you have a CSS file for styling

const Students = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchAllStudents = async () => {
            try {
                const res = await axios.get("http://localhost:3000/students");
                setStudents(res.data);  // Set the fetched data to the students state
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllStudents();
    }, []);

    return (
        <div className="students-container">
            <header className="students-header">
                <h1>Students</h1>
            </header>
            <ul className="students-list">
                {students.map(student => (
                    <li key={student.id} className="student-item">
                        <Link to={`/students/${student.id}`}>
                            {student.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Students;
*/