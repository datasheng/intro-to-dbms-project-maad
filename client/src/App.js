import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLogin from "./pages/StudentLogin";
import StudentHome from "./pages/StudentHome";
import EnrollCourse from "./pages/EnrollCourse";
import DropCourse from "./pages/DropCourse";
import SwapCourse from "./pages/SwapCourse";
import ViewSchedule from "./pages/ViewSchedule";
import SchoolAdminLogin from "./pages/SchoolAdminLogin";
import SchoolAdminHome from "./pages/SchoolAdminHome";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentLogin />} />
          <Route path="/student-home" element={<StudentHome />} />
          <Route path="/enroll" element={<EnrollCourse />} />
          <Route path="/drop" element={<DropCourse />} />
          <Route path="/swap" element={<SwapCourse />} />
          <Route path="/view-schedule" element={<ViewSchedule />} />
          <Route path="/school-admin-login" element={<SchoolAdminLogin />} />
          <Route path="/school-admin-home" element={<SchoolAdminHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
