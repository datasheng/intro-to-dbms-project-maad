import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Registrations = () => {
    const [registration, setRegistration] = useState([]);

    useEffect(() => {
        const fetchAllRegistration = async () => {
            try {
                const res = await axios.get("http://localhost:3000/registration");
                console.log('API Response:', res.data);  // Log the full API response
                res.data.forEach((reg, index) => {
                    console.log(`Registration ${index}:`, reg);  // Log each registration object
                });
                setRegistration(res.data);  // Set the fetched data to the registrations state
            } catch (err) {
                console.log('API Fetch Error:', err);
            }
        }
        fetchAllRegistration();
    }, []);

    return (
        <div className="registration-container">
            <header className="registration-header">
                <h1>Registration</h1>
            </header>
            <ul className="registration-list">
                {registration.map((reg, index) => (
                    <li key={index} className="registration-item">
                        <Link to={`/registration/${reg.registrationID}`}>
                            {`Registration ID: ${reg.registrationID}, Student: ${reg.studentID}, Section: ${reg.SectionID}`}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Registrations;





