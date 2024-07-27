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

// THINGS I CHANGED
import EnrollCourse from './pages/EnrollCourse.jsx';
import DropCourse from "./pages/DropCourse.jsx"
import SwapCourse from "./pages/SwapCourse.jsx"
import "./style.css"





function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Books />} />
          <Route path="/student" element={<Student />} />
          <Route path="/course" element={<Course />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/section" element={<Section />} />
          

          // MELVIN IS WORKING ON ENROLL, DROP, and SWAP
          <Route path="/enroll" element={<EnrollCourse />} /> // ADD ID TO IT 
          <Route path="/drop" element={<DropCourse />} />   // ADD ID TO IT 
          <Route path="/swap" element={<SwapCourse />} />   // ADD ID TO IT 
          
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;


/**import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import UpdateCourse from "./pages/UpdateCourse";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update/:id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
*/