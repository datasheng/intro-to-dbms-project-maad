import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Section = () => {
    const [section, setSection] = useState([]);

    useEffect(() => {
        const fetchAllSection = async () => {
            try {
                const res = await axios.get("http://localhost:3000/section");
                console.log('API Response:', res.data);  // Debugging line
                setSection(res.data);  // Set the fetched data to the sections state
            } catch (err) {
                console.log('API Fetch Error:', err);
            }
        }
        fetchAllSection();
    }, []);

    return (
        <div className="section-container">
            <header className="section-header">
                <h1>Section</h1>
            </header>
            <ul className="section-list">
                {section.map((section, index) => (
                    <li key={index} className="section-item">
                        <Link to={`/section/${section.SectionID}`}>
                            {`Room: ${section.Room}, Time: ${section.Time}, Days: ${section.Days}, Semester: ${section.Semester}, CourseID: ${section.CourseID}`}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Section;

/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import './Sections.css'; // Assuming you have a CSS file for styling

const Section = () => {
    const [section, setSection] = useState([]);

    useEffect(() => {
        const fetchAllSection = async () => {
            try {
                const res = await axios.get("http://localhost:3000/section");
                console.log('API Response:', res.data);  // Debugging line
                setSection(res.data);  // Set the fetched data to the sections state
            } catch (err) {
                console.log('API Fetch Error:', err);
            }
        }
        fetchAllSection();
    }, []);

    return (
        <div className="section-container">
            <header className="section-header">
                <h1>Section</h1>
            </header>
            <ul className="section-list">
                {section.map(section => (
                    <li key={section.SectionNum} className="section-item">
                        <Link to={`/section/${section.SectionNum}`}>
                            {`Room: ${section.Room}, Time: ${section.Time}, Days: ${section.Days}, Semester: ${section.Semester}, CourseID: ${section.CourseID}`}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Section;
*/
