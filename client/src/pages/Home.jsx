import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [student, setStudent] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentDetails = async () => {
            try {
                const studentID = localStorage.getItem('studentID'); // Assuming you store studentID in localStorage after login
                const res = await axios.get(`http://localhost:3000/student/${studentID}`);
                setStudent(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchStudentDetails();
    }, []);

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="home-container">
        <h1>Welcome, {student.Name}</h1>
        <p>Major: {student.Majors}</p>
        <button onClick={() => handleNavigation('/schedule')}>View Schedule</button>
        <button onClick={() => handleNavigation('/enroll')}>Enroll in Course</button>
        <button onClick={() => handleNavigation('/drop')}>Drop Course</button>
        <button onClick={() => handleNavigation('/swap')}>Swap Course</button>
        <button onClick={() => handleNavigation('/new-schedule')}>New Schedule</button>
        <button onClick={() => handleNavigation('/logout')}>Logout</button>
    </div>
    );
};

export default Home;



/*
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
    const location = useLocation();
    const student = location.state;
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome {student?.Name}</h1>
                <p>Student ID: {student?.studentID}</p>
                <p>Major: {student?.Majors}</p>
            </header>
            <div className="home-options">
                <button onClick={() => navigate('/enroll')}>Enroll</button>
                <button onClick={() => navigate('/drop')}>Drop</button>
                <button onClick={() => navigate('/swap')}>Swap</button>
                <button onClick={() => navigate('/schedule')}>View Schedule</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Home;

*/
/*

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [student, setStudent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get("http://localhost:3001/student/1"); // Replace '1' with the actual student ID
                setStudent(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchStudent();
    }, []);

    const handleLogout = () => {
        // Logic for logging out
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome {student?.Name}</h1>
                <p>Student ID: {student?.studentID}</p>
                <p>Major: {student?.Majors}</p>
            </header>
            <div className="home-options">
                <button onClick={() => navigate('/enroll')}>Enroll</button>
                <button onClick={() => navigate('/drop')}>Drop</button>
                <button onClick={() => navigate('/swap')}>Swap</button>
                <button onClick={() => navigate('/schedule')}>View Schedule</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Home;
*/

/*
import React from 'react'
//import { useEffect } from 'react'
//import { useState } from 'react'
//import axios from 'axios'
import { Link } from "react-router-dom"


//import './Home.css'; // Assuming you have a CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to EnrollHub</h1>
        <p>Your comprehensive web application for student course enrollment.</p>
      </header>
      <nav className="home-nav">
        <ul>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/instructor">Instructors</Link></li>
          <li><Link to="/add_Course">Add Course</Link></li>
          <li><Link to="/update">Update</Link></li>
          <li><Link to="/students">Students</Link></li>
        </ul>
      </nav>
      <footer className="home-footer">
        <p>&copy; 2024 EnrollHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

*/