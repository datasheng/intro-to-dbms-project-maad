// Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear studentID from localStorage
        localStorage.removeItem('studentID');
        // Redirect to login page
        navigate('/');
    }, [navigate]);

    return (
        <div>
            Logging out...
        </div>
    );
};

export default Logout;
