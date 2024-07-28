import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ViewSchedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { student } = location.state || {};
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/schedule/${student.StudentID}`);
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, [student.StudentID]);

  const handleLogout = () => {
    navigate('/');
  };

  const handleHome = () => {
    navigate('/student-home', { state: { student } });
  };

  return (
    <div className="view-schedule">
      <h1>View Schedule</h1>
      <div className="schedule-table">
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
      <button className="home-button" onClick={handleHome}>Home</button>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ViewSchedule;
