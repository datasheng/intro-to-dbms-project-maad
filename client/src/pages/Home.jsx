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

