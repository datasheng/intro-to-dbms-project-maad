import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import './Registrations.css'; // Assuming you have a CSS file for styling

const Registrations = () => {
    const [registrations, setRegistrations] = useState([]);

    useEffect(() => {
        const fetchAllRegistrations = async () => {
            try {
                const res = await axios.get("http://localhost:3000/registrations");
                console.log('API Response:', res.data);  // Debugging line
                setRegistrations(res.data);  // Set the fetched data to the registrations state
            } catch (err) {
                console.log('API Fetch Error:', err);
            }
        }
        fetchAllRegistrations();
    }, []);

    return (
        <div className="registrations-container">
            <header className="registrations-header">
                <h1>Registrations</h1>
            </header>
            <ul className="registrations-list">
                {registrations.map(registration => (
                    <li key={registration.RegistrationID} className="registration-item">
                        <Link to={`/registrations/${registration.RegistrationID}`}>
                            {`Student: ${registration.StudentID}, Section: ${registration.SectionNum}, Teacher: ${registration.TeacherID}`}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Registrations;

