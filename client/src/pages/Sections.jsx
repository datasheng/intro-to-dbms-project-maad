import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import './Sections.css'; // Assuming you have a CSS file for styling

const Sections = () => {
    const [sections, setSections] = useState([]);

    useEffect(() => {
        const fetchAllSections = async () => {
            try {
                const res = await axios.get("http://localhost:3000/sections");
                console.log('API Response:', res.data);  // Debugging line
                setSections(res.data);  // Set the fetched data to the sections state
            } catch (err) {
                console.log('API Fetch Error:', err);
            }
        }
        fetchAllSections();
    }, []);

    return (
        <div className="sections-container">
            <header className="sections-header">
                <h1>Sections</h1>
            </header>
            <ul className="sections-list">
                {sections.map(section => (
                    <li key={section.SectionNum} className="section-item">
                        <Link to={`/sections/${section.SectionNum}`}>
                            {`Room: ${section.Room}, Time: ${section.Time}, Days: ${section.Days}, Semester: ${section.Semester}, CourseID: ${section.CourseID}`}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sections;
