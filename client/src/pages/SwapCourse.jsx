import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SwapCourse = () => {
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [selectedEnrolledClass, setSelectedEnrolledClass] = useState(null);
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

    // Fetch enrolled classes (replace 'testStudentID' with actual student ID)
    axios.get('http://localhost:8800/enrolled-courses/testStudentID')
      .then(response => {
        setEnrolledClasses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the enrolled classes!', error);
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

  const handleEnrolledClassChange = (event) => {
    const selectedEnrolledClassId = parseInt(event.target.value, 10);
    console.log('Selected enrolled class ID:', selectedEnrolledClassId); // Log the selected enrolled class ID for debugging
    const selectedEnrolledClass = enrolledClasses.find(cls => cls.SectionID === selectedEnrolledClassId);
    console.log('Selected enrolled class:', selectedEnrolledClass); // Log the selected enrolled class for debugging
    setSelectedEnrolledClass(selectedEnrolledClass);
  };

  const handleSwap = () => {
    // If you want to hardcode a student ID for testing purposes, you can set it here
    const studentID = 'testStudentID';

    if (selectedClass && selectedEnrolledClass && studentID) {
      axios.post('http://localhost:8800/swap-course', {
        studentID,
        newSectionID: selectedClass.SectionID,
        oldSectionID: selectedEnrolledClass.SectionID
      })
      .then(response => {
        alert(response.data);
        setSelectedMajor('');
        setClasses([]);
        setSelectedClass(null);
        setSelectedEnrolledClass(null);
      })
      .catch(error => {
        console.error('There was an error swapping the class!', error);
      });
    } else {
      alert('Please select both a new class and an enrolled class to swap.');
    }
  };

  return (
    <div className="swap-container">
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <h2>Swap a Class</h2>
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
        <label htmlFor="class">Search Class:</label>
        <select id="class" value={selectedClass ? selectedClass.SectionID : ''} onChange={handleClassChange}>
          <option value="">Select Class</option>
          {Array.isArray(classes) && classes.map((cls, index) => (
            <option key={index} value={cls.SectionID}>{cls.courseName}</option>
          ))}
        </select>
      </div>

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

      <div>
        <label htmlFor="enrolledClasses">Enrolled Class to Swap:</label>
        <select id="enrolledClasses" value={selectedEnrolledClass ? selectedEnrolledClass.SectionID : ''} onChange={handleEnrolledClassChange}>
          <option value="">Select Enrolled Class</option>
          {Array.isArray(enrolledClasses) && enrolledClasses.map((cls, index) => (
            <option key={index} value={cls.SectionID}>{cls.courseName}</option>
          ))}
        </select>
      </div>

      <button onClick={handleSwap} disabled={!selectedClass || !selectedEnrolledClass}>
        Swap
      </button>
    </div>
  );
};

export default SwapCourse;
