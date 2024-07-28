// Import necessary modules from React, Axios, and React Router DOM
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

// Define the ViewSchedule component
const ViewSchedule = () => {
  // Get the navigation and location functions from React Router
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the student object from the location state
  const { student } = location.state || {};

  // State variable to manage the student's schedule
  const [schedule, setSchedule] = useState([]);

  // useEffect hook to fetch the student's current schedule when the component mounts
  useEffect(() => {
    // Function to fetch the schedule from the backend
    const fetchSchedule = async () => {
      try {
        // Fetch the student's current schedule using their StudentID
        const response = await axios.get(`http://localhost:8800/schedule/${student.StudentID}`);
        // Update the state with the fetched schedule
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, [student.StudentID]);

  // Function to handle logout
  const handleLogout = () => {
    // Navigate to the home page
    navigate('/');
  };

  // Function to navigate to the student home page
  const handleHome = () => {
    navigate('/student-home', { state: { student } });
  };

  // Render the component
  return (
    <div className="view-schedule">
      <h1>View Schedule</h1>
      <div className="schedule-table">
        {/* Table to display the student's current schedule */}
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Room</th>
              <th>Section</th>
              <th>Days</th>
              <th>Time</th>
              <th>Semester</th>
              <th>Teacher Name</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index}>
                <td>{item.CourseName}</td>
                <td>{item.Room}</td>
                <td>{item.SectionID}</td>
                <td>{item.Days}</td>
                <td>{item.Time}</td>
                <td>{item.Semester}</td>
                <td>{item.TeacherName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Button to navigate to the student home page */}
      <button className="home-button" onClick={handleHome}>Home</button>
      {/* Button to logout */}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Export the ViewSchedule component as the default export
export default ViewSchedule;
