import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "...",  // <---- insert your password here
  database: "enrollment",  // <---- get database set up through the query statements
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
    SELECT c.CourseName, s.Time, s.Days, s.Room, s.SectionID, s.Semester, t.TeacherName
    FROM registration r
    JOIN section s ON r.SectionID = s.SectionID
    JOIN course c ON s.CourseID = c.CourseID
    JOIN teacher t ON s.TeacherID = t.TeacherID
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
    if (err) {
      console.error("Error finding course ID:", err);
      return res.status(500).json({ error: "Error finding course ID" });
    }

    if (courseResult.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    const courseId = courseResult[0].CourseID;

    // Then, find an available section for the course
    const findSectionIdQuery = "SELECT SectionID FROM section WHERE CourseID = ? LIMIT 1";
    db.query(findSectionIdQuery, [courseId], (err, sectionResult) => {
      if (err) {
        console.error("Error finding section ID:", err);
        return res.status(500).json({ error: "Error finding section ID" });
      }

      if (sectionResult.length === 0) {
        return res.status(404).json({ error: "Section not found" });
      }

      const sectionId = sectionResult[0].SectionID;

      // Generate a new RegistrationID (simple increment strategy)
      const getMaxRegistrationIdQuery = "SELECT MAX(RegistrationID) as maxId FROM registration";
      db.query(getMaxRegistrationIdQuery, (err, maxResult) => {
        if (err) {
          console.error("Error getting max RegistrationID:", err);
          return res.status(500).json({ error: "Error getting max RegistrationID" });
        }

        const newRegistrationId = (maxResult[0].maxId || 0) + 1;

        // Finally, insert a new registration record
        const enrollQuery = "INSERT INTO registration (RegistrationID, SectionID, StudentID) VALUES (?, ?, ?)";
        db.query(enrollQuery, [newRegistrationId, sectionId, studentId], (err, enrollResult) => {
          if (err) {
            console.error("Error enrolling in course:", err);
            return res.status(500).json({ error: "Error enrolling in course" });
          }

          // Return the new schedule entry to update the front-end
          const newScheduleQuery = `
            SELECT c.CourseName, s.Time, s.Days, s.Room, s.SectionID, s.Semester, t.TeacherName
            FROM section s
            JOIN course c ON s.CourseID = c.CourseID
            JOIN teacher t ON s.TeacherID = t.TeacherID
            WHERE s.SectionID = ?
          `;
          db.query(newScheduleQuery, [sectionId], (err, newScheduleResult) => {
            if (err) {
              console.error("Error fetching new schedule:", err);
              return res.status(500).json({ error: "Error fetching new schedule" });
            }
            return res.json(newScheduleResult[0]);
          });
        });
      });
    });
  });
});

app.post("/drop", (req, res) => {
  const { studentId, courseName } = req.body;

  // First, find the course ID for the given course name
  const findCourseIdQuery = "SELECT CourseID FROM course WHERE CourseName = ?";
  db.query(findCourseIdQuery, [courseName], (err, courseResult) => {
    if (err) return res.json(err);
    const courseId = courseResult[0].CourseID;

    // Then, find the section for the course and student
    const findSectionIdQuery = `
      SELECT r.SectionID, r.RegistrationID 
      FROM registration r
      JOIN section s ON r.SectionID = s.SectionID
      WHERE r.StudentID = ? AND s.CourseID = ?
    `;
    db.query(findSectionIdQuery, [studentId, courseId], (err, sectionResult) => {
      if (err) return res.json(err);
      const sectionId = sectionResult[0].SectionID;
      const registrationId = sectionResult[0].RegistrationID;

      // Finally, delete the registration record
      const dropQuery = "DELETE FROM registration WHERE RegistrationID = ? AND SectionID = ? AND StudentID = ?";
      db.query(dropQuery, [registrationId, sectionId, studentId], (err, dropResult) => {
        if (err) return res.json(err);
        return res.json({ success: true });
      });
    });
  });
});

app.post("/swap", (req, res) => {
  const { studentId, currentCourseName, newCourseName } = req.body;

  // First, drop the current course
  const findCurrentCourseIdQuery = "SELECT CourseID FROM course WHERE CourseName = ?";
  db.query(findCurrentCourseIdQuery, [currentCourseName], (err, currentCourseResult) => {
    if (err) return res.json(err);
    const currentCourseId = currentCourseResult[0].CourseID;

    const findCurrentSectionIdQuery = `
      SELECT r.SectionID, r.RegistrationID 
      FROM registration r
      JOIN section s ON r.SectionID = s.SectionID
      WHERE r.StudentID = ? AND s.CourseID = ?
    `;
    db.query(findCurrentSectionIdQuery, [studentId, currentCourseId], (err, currentSectionResult) => {
      if (err) return res.json(err);
      const currentSectionId = currentSectionResult[0].SectionID;
      const currentRegistrationId = currentSectionResult[0].RegistrationID;

      const dropQuery = "DELETE FROM registration WHERE RegistrationID = ? AND SectionID = ? AND StudentID = ?";
      db.query(dropQuery, [currentRegistrationId, currentSectionId, studentId], (err, dropResult) => {
        if (err) return res.json(err);

        // Then, enroll in the new course
        const findNewCourseIdQuery = "SELECT CourseID FROM course WHERE CourseName = ?";
        db.query(findNewCourseIdQuery, [newCourseName], (err, newCourseResult) => {
          if (err) return res.json(err);
          const newCourseId = newCourseResult[0].CourseID;

          const findNewSectionIdQuery = "SELECT SectionID FROM section WHERE CourseID = ? LIMIT 1";
          db.query(findNewSectionIdQuery, [newCourseId], (err, newSectionResult) => {
            if (err) return res.json(err);
            const newSectionId = newSectionResult[0].SectionID;

            const getMaxRegistrationIdQuery = "SELECT MAX(RegistrationID) as maxId FROM registration";
            db.query(getMaxRegistrationIdQuery, (err, maxResult) => {
              if (err) {
                console.error("Error getting max RegistrationID:", err);
                return res.status(500).json({ error: "Error getting max RegistrationID" });
              }

              const newRegistrationId = (maxResult[0].maxId || 0) + 1;

              const enrollQuery = "INSERT INTO registration (RegistrationID, SectionID, StudentID) VALUES (?, ?, ?)";
              db.query(enrollQuery, [newRegistrationId, newSectionId, studentId], (err, enrollResult) => {
                if (err) return res.json(err);
                return res.json({ success: true });
              });
            });
          });
        });
      });
    });
  });
});

app.listen(8800, () => {
  console.log("Connected to backend...");
});
