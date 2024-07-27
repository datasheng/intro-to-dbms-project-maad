import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Student from "./pages/Student.jsx";
import Books from "./pages/Books";
import Course from "./pages/Course.jsx";
import Instructor from "./pages/Instructor.jsx";
import Registration from "./pages/Registration.jsx";
import Section from "./pages/Section.jsx";
import Login from './pages/Login.jsx';
import Drop from './pages/Drop.jsx';
import Enroll from './pages/Enroll.jsx';
import Schedule from './pages/Schedule';
import Swap from './pages/Swap.jsx';
import NewSchedule from './pages/NewSchedule.jsx';
import Logout from './pages/Logout.jsx'; 

//import NewSchedule from './NewSchedule'; // Create this component
function App() {
  const [student, setStudent] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/student" element={<Student />} />
          <Route path="/course" element={<Course />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/section" element={<Section />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/drop" element={<Drop />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/new-schedule" element={<NewSchedule />} />
          <Route path="/logout" element={<Logout />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}
//{student && (
  //<Route path="/drop" element={<Drop studentID={student.studentID} />} />
//)}
export default App;


/*
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import axios from 'axios';

import Home from "./pages/Home";
import Student from "./pages/Student.jsx";
import Books from "./pages/Books";
import Course from "./pages/Course.jsx";
import Instructor from "./pages/Instructor.jsx";
import Registration from "./pages/Registration.jsx";
import Section from "./pages/Section.jsx";
import Login from './pages/Login';
import Drop from './pages/Drop';

function App() {
  const [student, setStudent] = useState(null);

  const fetchStudentData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/student/1'); // Fetch student with ID 1 as an example
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    const fetchStudent = async () => {
      const studentData = await fetchStudentData();
      setStudent(studentData);
    };
    fetchStudent();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/student" element={<Student />} />
          <Route path="/course" element={<Course />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/section" element={<Section />} />
          {student && (
            <Route path="/drop" element={<Drop studentID={student.studentID} />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

*/
/*
import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
}from "react-router-dom";

import Home from "./pages/Home";
import Student from "./pages/Student.jsx";
import Books from "./pages/Books";
import Course from "./pages/Course.jsx";
import Instructor from "./pages/Instructor.jsx"
import Registration from "./pages/Registration.jsx";
import Section from "./pages/Section.jsx";
import Login from './pages/Login';
import Drop from './pages/Drop';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/student" element={<Student />} />
          <Route path="/course" element={<Course />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/section" element={<Section />} />
          <Route path="/drop" element={<Drop studentID={student.studentID} />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;


*/