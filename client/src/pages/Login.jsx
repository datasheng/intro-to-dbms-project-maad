import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [studentID, setStudentID] = useState('');
    const [fullName, setFullName] = useState('');
    const [major, setMajor] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/login", {
                studentID,
                fullName,
                major
            });
            if (res.data.status === 'success') {
                console.log('Login successful', res.data.data);
                // Navigate to the home page or any other page
                navigate('/home');
            } else {
                alert('Invalid credentials');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <div>
                    <label>Student ID</label>
                    <input
                        type="text"
                        value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}
                    />
                </div>
                <div>
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Major</label>
                    <input
                        type="text"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
