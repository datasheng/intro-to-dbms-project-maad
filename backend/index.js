import express from "express" 
import mysql from "mysql"
import cors from "cors"

const app = express()
app.use(express.json());

//Connection to MySQL
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"hj12ui9l/+12?",
    database:"enrollment"
})


app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("hello it's we are backend!")
})

//it test function, works!! Exces Books SQL data example
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})

// Fetch students data - works
app.get("/student", (req, res) => {
    const q = "SELECT * FROM student";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//Fetch courses data
app.get("/course", (req, res) => {
    const q = "SELECT * FROM course";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Fetch instructors data 
app.get("/instructor", (req, res) => {
    const q = "SELECT * FROM instructor";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Fetch registration data 
app.get("/registration", (req, res) => {
    const q = "SELECT * FROM registration";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Fetch sections data 
app.get("/section", (req, res) => {
    const q = "SELECT * FROM section";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


// Login route
app.post("/login", (req, res) => {
    const { studentID, fullName, major } = req.body;
    const q = "SELECT * FROM student WHERE studentID = ? AND Name = ? AND Majors = ?";
    db.query(q, [studentID, fullName, major], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
            const student = data[0];
            return res.json({
                status: "success",
                studentID: student.studentID,
                fullName: student.Name,
                major: student.Majors
            });
        } else {
            return res.json({ status: "fail", message: "Invalid credentials" });
        }
    });
});

// Fetch student details by ID
app.get("/student/:id", (req, res) => {
    const studentID = req.params.id;
    const q = "SELECT * FROM student WHERE studentID = ?";
    db.query(q, [studentID], (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0]);
    });
});

// Fetch schedule for a student
app.get("/schedule/:studentID", (req, res) => {
    const studentID = req.params.studentID;
    const q = `
        SELECT course.courseName, section.Room, section.Time, section.Days, section.Semester
        FROM registration
        JOIN section ON registration.SectionID = section.SectionID
        JOIN course ON section.courseID = course.courseID
        WHERE registration.studentID = ?
    `;
    db.query(q, [studentID], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


// Fetch available courses for a student
app.get("/available-courses/:studentID", (req, res) => {
    const studentID = req.params.studentID;
    console.log("Fetching available courses for studentID:", studentID); // Debug log
    const q = `
        SELECT course.courseID, course.courseName, course.Credit 
        FROM course 
        WHERE course.courseID NOT IN (
            SELECT section.courseID 
            FROM registration 
            JOIN section ON registration.SectionID = section.SectionID 
            WHERE registration.studentID = ?
        )
    `;
    db.query(q, [studentID], (err, data) => {
        if (err) {
            console.error("Error fetching available courses:", err); // Debug log
            return res.json(err);
        }
        console.log("Available courses data:", data); // Debug log
        return res.json(data);
    });
});

// Fetch enrolled courses for a student
app.get("/enrolled-courses/:studentID", (req, res) => {
    const studentID = req.params.studentID;
    const q = `
        SELECT course.courseID, course.courseName, section.SectionID, section.Room, section.Time, section.Days, section.Semester
        FROM registration
        JOIN section ON registration.SectionID = section.SectionID
        JOIN course ON section.courseID = course.courseID
        WHERE registration.studentID = ?
    `;
    db.query(q, [studentID], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Drop a course
app.post("/drop-course", (req, res) => {
    const { studentID, sectionID } = req.body;
    const q = "DELETE FROM registration WHERE studentID = ? AND SectionID = ?";
    db.query(q, [studentID, sectionID], (err, data) => {
        if (err) return res.json(err);
        return res.json("Dropped successfully");
    });
});


//For the SWAP page course fetch all courses
app.get("/all-courses", (req, res) => {
    const q = "SELECT * FROM course";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//For the SWAP course page Fetch all courses
app.get("/all-courses", (req, res) => {
    const q = "SELECT * FROM course";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//For page new scheduale 
// Fetch available courses and their sections
app.get("/available-courses-sections", (req, res) => {
    const q = `
        SELECT course.courseID, course.courseName, section.SectionID, section.Room, section.Time, section.Days, section.Semester
        FROM course
        JOIN section ON course.courseID = section.courseID
    `;
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
//For page new scheduale 
// Save new schedule
app.post("/save-schedule", (req, res) => {
    const { studentID, sections } = req.body;

    const deleteQuery = "DELETE FROM registration WHERE studentID = ?";
    const insertQuery = "INSERT INTO registration (studentID, SectionID) VALUES ?";

    db.beginTransaction(err => {
        if (err) return res.json(err);

        db.query(deleteQuery, [studentID], (err, result) => {
            if (err) {
                return db.rollback(() => {
                    res.json(err);
                });
            }

            const values = sections.map(sectionID => [studentID, sectionID]);
            db.query(insertQuery, [values], (err, result) => {
                if (err) {
                    return db.rollback(() => {
                        res.json(err);
                    });
                }

                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            res.json(err);
                        });
                    }
                    res.json("Schedule saved successfully");
                });
            });
        });
    });
});


/*
// Fetch available courses for a student
app.get("/available-courses/:studentID", (req, res) => {
    const studentID = req.params.studentID;
    const q = `
        SELECT course.courseID, course.courseName, course.Credit 
        FROM course 
        WHERE course.courseID NOT IN (
            SELECT section.courseID 
            FROM registration 
            JOIN section ON registration.SectionID = section.SectionID 
            WHERE registration.studentID = ?
        )
    `;
    db.query(q, [studentID], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Enroll in a course
app.post("/enroll", (req, res) => {
    const { studentID, courseID, sectionID } = req.body;
    const q = `
        INSERT INTO registration (studentID, SectionID) 
        VALUES (?, ?)
    `;
    db.query(q, [studentID, sectionID], (err, data) => {
        if (err) return res.json(err);
        return res.json("Enrolled successfully");
    });
});
*/

/*
app.post("/student/:id/drop", (req, res) => {
    const studentID = req.params.id;
    const { sectionID } = req.body;
    const q = "DELETE FROM registration WHERE studentID = ? AND SectionID = ?";
    db.query(q, [studentID, sectionID], (err, data) => {
        if (err) return res.json(err);
        return res.json({ status: "success", message: "Course dropped successfully" });
    });
});
*/



app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        //req.body.price,
        req.body.cover,
    ];

    db.query(q,[values], (err, data)=>{
        if(err) return res.json(err)
            return res.json("Book has been created succesfuly.");
    });
});

// Changes Melvin did

app.get("/majors", (req, res) => {
    const q = "SELECT DISTINCT StudentMajor FROM student";
    db.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
  
  // Fetch classes based on major
  app.get("/classes/:major", (req, res) => {
    const major = req.params.major;
    const q = `
      SELECT course.courseID, course.courseName, section.SectionID, section.Room, section.Time, section.Days, section.Semester
      FROM course
      JOIN section ON course.courseID = section.courseID
      WHERE course.CourseMajor = ?
    `;
    db.query(q, [major], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
  
  // Enroll in a course
  app.post("/enroll", (req, res) => {
    const { studentID, sectionID } = req.body;
    const q = "INSERT INTO registration (studentID, SectionID) VALUES (?, ?)";
    db.query(q, [studentID, sectionID], (err, data) => {
      if (err) return res.json(err);
      return res.json("Enrolled successfully");
    });
  });
  

// Swap classes
app.post('/swap-course', (req, res) => {
    const { studentID, newSectionID, oldSectionID } = req.body;
  
    // Begin a transaction
    db.beginTransaction(err => {
      if (err) return res.json(err);
  
      // Delete the old class enrollment
      const deleteQuery = 'DELETE FROM registration WHERE studentID = ? AND SectionID = ?';
      db.query(deleteQuery, [studentID, oldSectionID], (err, result) => {
        if (err) {
          return db.rollback(() => {
            res.json(err);
          });
        }
  
        // Enroll in the new class
        const insertQuery = 'INSERT INTO registration (studentID, SectionID) VALUES (?, ?)';
        db.query(insertQuery, [studentID, newSectionID], (err, result) => {
          if (err) {
            return db.rollback(() => {
              res.json(err);
            });
          }
  
          // Commit the transaction
          db.commit(err => {
            if (err) {
              return db.rollback(() => {
                res.json(err);
              });
            }
            res.json('Class swapped successfully');
          });
        });
      });
    });
  });

// End of changes Melvin did 


app.listen(8800, ()=>{
    console.log ("Connected to backend!")
})
