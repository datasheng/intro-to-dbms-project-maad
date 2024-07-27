import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DropCourse = () => {
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  // Fetch the classes the student is currently enrolled in
  useEffect(() => {
    // Replace with actual API call to fetch enrolled classes
    axios.get('http://localhost:8800/enrolled-courses/testStudentID') // Replace with the actual student ID
      .then(response => setEnrolledClasses(response.data))
      .catch(error => console.error('Error fetching enrolled classes:', error));

    // Mock data for demonstration (comment out this block in production)
    /*
    const mockEnrolledClasses = [
      { courseID: 1, courseName: 'Calculus I', Room: '101', Time: '10:00 AM', Days: 'MWF', Semester: 'Fall 2024' },
      { courseID: 2, courseName: 'Calculus II', Room: '102', Time: '11:00 AM', Days: 'TTh', Semester: 'Fall 2024' },
      { courseID: 3, courseName: 'Calculus III', Room: '103', Time: '12:00 PM', Days: 'MWF', Semester: 'Fall 2024' },
      { courseID: 4, courseName: 'Algorithms', Room: '104', Time: '1:00 PM', Days: 'TTh', Semester: 'Fall 2024' },
      { courseID: 5, courseName: 'Database System', Room: '105', Time: '2:00 PM', Days: 'MWF', Semester: 'Fall 2024' },
    ];
    setEnrolledClasses(mockEnrolledClasses);
    */
  }, []);

  // Handle drop button click
  const handleDrop = () => {
    if (selectedClass) {
      axios.post('http://localhost:8800/drop-course', { studentID: 'testStudentID', sectionID: selectedClass.SectionID }) // Replace with the actual student ID
        .then(response => {
          console.log('Class dropped successfully', response);
          // Optionally, refresh the list of enrolled classes
          setEnrolledClasses(enrolledClasses.filter(cls => cls.SectionID !== selectedClass.SectionID));
          setSelectedClass(null);
        })
        .catch(error => console.error('Error dropping class:', error));

      // For now, just log the selected class
      console.log('Class to drop:', selectedClass);
    }
  };

  return (
    <div>
      <div>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <h2>Drop a Class</h2>
      </div>

      <div>
        <label htmlFor="enrolledClasses">Select Class to Drop:</label>
        <select
          id="enrolledClasses"
          value={selectedClass ? selectedClass.SectionID : ''}
          onChange={(e) => {
            const selected = enrolledClasses.find(cls => cls.SectionID === parseInt(e.target.value));
            setSelectedClass(selected);
          }}
        >
          <option value="">--Select Class--</option>
          {enrolledClasses.map((cls) => (
            <option key={cls.SectionID} value={cls.SectionID}>
              {cls.courseName}
            </option>
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

      <button onClick={handleDrop} disabled={!selectedClass}>
        Drop
      </button>
    </div>
  );
};

// NEEDS A STUDENT TO BE LOGGED IN IN ORDER TO DROP A CLASS FROM THAT STUDENTS SCHEDULE

export default DropCourse;
