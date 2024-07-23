import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
}from "react-router-dom";

import Home from "./pages/Home";
import Students from "./pages/Students.jsx";
import Books from "./pages/Books";
import Courses from "./pages/Courses";
import Instructors from "./pages/Instructors"
import Registrations from "./pages/Registrations";
import Sections from "./pages/Sections";




function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Books />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/sections" element={<Sections />} />
          
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