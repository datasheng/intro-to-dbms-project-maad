import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "...", // <--- enter your MySQL password here
  database: "enrollment",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/majors", (req, res) => {
  const q = "SELECT DISTINCT StudentMajor FROM student";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/schools", (req, res) => {
  const q = "SELECT DISTINCT SchoolName FROM school";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/student-login", (req, res) => {
  const { studentName, studentId, major, schoolName } = req.body;
  const q = "SELECT * FROM student WHERE StudentName = ? AND StudentID = ? AND StudentMajor = ? AND SchoolName = ?";
  db.query(q, [studentName, studentId, major, schoolName], (err, data) => {
    if (err) return res.json(err);
    if (data.length > 0) {
      return res.json({ success: true, student: data[0] });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  });
});

app.post("/admin-login", (req, res) => {
  const { schoolName, schoolId, licenseId } = req.body;
  console.log(`Received admin login request for ${schoolName}, ${schoolId}, ${licenseId}`);
  const q = "SELECT * FROM school WHERE SchoolName = ? AND SchoolID = ? AND LicenseID = ?";
  db.query(q, [schoolName, schoolId, licenseId], (err, data) => {
    if (err) {
      console.error("Error executing query", err);
      return res.json(err);
    }
    if (data.length > 0) {
      console.log("Admin login successful", data[0]);
      return res.json({ success: true, admin: data[0] });
    } else {
      console.log("Admin login failed: Invalid credentials");
      return res.json({ success: false, message: "Invalid credentials" });
    }
  });
});

app.get("/course-majors", (req, res) => {
  const q = "SELECT DISTINCT CourseMajor FROM course";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/courses/:major", (req, res) => {
  const major = req.params.major;
  const q = "SELECT CourseName FROM course WHERE CourseMajor = ?";
  db.query(q, [major], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/schedule/:studentId", (req, res) => {
  const studentId = req.params.studentId;
  const q = `
    SELECT c.CourseName, s.Time, s.Days 
    FROM registration r
    JOIN section s ON r.SectionID = s.SectionID
    JOIN course c ON s.CourseID = c.CourseID
    WHERE r.StudentID = ?
  `;
  db.query(q, [studentId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/students/:schoolId", (req, res) => {
  const schoolId = req.params.schoolId;
  const q = "SELECT * FROM student WHERE SchoolID = ?";
  db.query(q, [schoolId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/enroll", (req, res) => {
  const { studentId, courseName } = req.body;

  // First, find the course ID for the given course name
  const findCourseIdQuery = "SELECT CourseID FROM course WHERE CourseName = ?";
  db.query(findCourseIdQuery, [courseName], (err, courseResult) => {
    if (err) return res.json(err);
    const courseId = courseResult[0].CourseID;

    // Then, find an available section for the course
    const findSectionIdQuery = "SELECT SectionID FROM section WHERE CourseID = ? LIMIT 1";
    db.query(findSectionIdQuery, [courseId], (err, sectionResult) => {
      if (err) return res.json(err);
      const sectionId = sectionResult[0].SectionID;

      // Finally, insert a new registration record
      const enrollQuery = "INSERT INTO registration (SectionID, StudentID) VALUES (?, ?)";
      db.query(enrollQuery, [sectionId, studentId], (err, enrollResult) => {
        if (err) return res.json(err);

        // Return the new schedule entry to update the front-end
        const newScheduleQuery = `
          SELECT c.CourseName, s.Time, s.Days 
          FROM section s
          JOIN course c ON s.CourseID = c.CourseID
          WHERE s.SectionID = ?
        `;
        db.query(newScheduleQuery, [sectionId], (err, newScheduleResult) => {
          if (err) return res.json(err);
          return res.json(newScheduleResult[0]);
        });
      });
    });
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
