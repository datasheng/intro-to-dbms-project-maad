import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const EnrollCourse = () => {
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  // const [studentID, setStudentID] = useState(''); // Assuming you get this from somewhere

  useEffect(() => {
    // Fetch majors
    axios.get('http://localhost:8800/majors')
      .then(response => {
        console.log('Majors response:', response.data); // Log the response for debugging
        if (Array.isArray(response.data)) {
          setMajors(response.data);
        } else {
          console.error('Unexpected majors response:', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the majors!', error);
      });
  }, []);

  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
    // Fetch classes for the selected major
    axios.get(`http://localhost:8800/classes/${event.target.value}`)
      .then(response => {
        console.log('Classes response:', response.data); // Log the response for debugging
        if (Array.isArray(response.data)) {
          setClasses(response.data);
        } else {
          console.error('Unexpected classes response:', response.data);
        }
      })
      .catch(error => {
        console.error('There was an error fetching the classes!', error);
      });
  };

  const handleClassChange = (event) => {
    const selectedClassId = parseInt(event.target.value, 10);
    console.log('Selected class ID:', selectedClassId); // Log the selected class ID for debugging
    const selectedClass = classes.find(cls => cls.SectionID === selectedClassId);
    console.log('Selected class:', selectedClass); // Log the selected class for debugging
    setSelectedClass(selectedClass);
  };

  const handleEnroll = () => {
    // If you want to hardcode a student ID for testing purposes, you can set it here
    const studentID = 'testStudentID';

    if (selectedClass && studentID) {
      axios.post('http://localhost:8800/enroll', {
        studentID,
        sectionID: selectedClass.SectionID
      })
      .then(response => {
        alert(response.data);
        setSelectedMajor('');
        setClasses([]);
        setSelectedClass(null);
      })
      .catch(error => {
        console.error('There was an error enrolling in the class!', error);
      });
    } else {
      alert('Please select a class and ensure you are logged in.');
    }
  };

  return (
    <div className="enroll-container">
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <h2>Drop a Class</h2>
      </div>

      <div>
        <label htmlFor="major">Major:</label>
        <select id="major" value={selectedMajor} onChange={handleMajorChange}>
          <option value="">Select Major</option>
          {Array.isArray(majors) && majors.map((major, index) => (
            <option key={index} value={major.StudentMajor}>{major.StudentMajor}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="class">Class:</label>
        <select id="class" value={selectedClass ? selectedClass.SectionID : ''} onChange={handleClassChange}>
          <option value="">Select Class</option>
          {Array.isArray(classes) && classes.map((cls, index) => (
            <option key={index} value={cls.SectionID}>{cls.courseName}</option>
          ))}
        </select>
      </div>

      <button onClick={handleEnroll}>Enroll</button>

      {selectedClass && (
        <div className="class-info">
          <h3>Class Information</h3>
          <p>Course Name: {selectedClass.courseName}</p>
          <p>Room: {selectedClass.Room}</p>
          <p>Time: {selectedClass.Time}</p>
          <p>Days: {selectedClass.Days}</p>
          <p>Semester: {selectedClass.Semester}</p>
        </div>
      )}
    </div>
  );
};

export default EnrollCourse;
