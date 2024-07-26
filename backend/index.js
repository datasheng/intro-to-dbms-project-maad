import express from "express" 
import mysql from "mysql"
import cors from "cors"

const app = express()
app.use(express.json());

//Connection to MySQL
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"GermanVoronovich",
    database:"enrollhub"
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



/*
// Fetch specific student data
app.get("/student/:id", (req, res) => {
    const studentID = req.params.id;
    const q = "SELECT * FROM student WHERE studentID = ?";
    db.query(q, [studentID], (err, data) => {
        if (err) return res.json(err);
        return res.json(data[0] == db.query(q, [studentID]) );
    });
});
*/
/*
// Fetch specific student data
app.get("/student/:id", (req, res) => {
    const studentID = req.params.id;
    console.log("Fetching data for studentID:", studentID); // Debugging line
    const q = "SELECT * FROM student WHERE studentID = ?";
    db.query(q, [studentID], (err, data) => {
        if (err) {
            console.error("Error fetching data:", err);
            return res.json(err);
        }
        console.log("Fetched data:", data); // Debugging line
        return res.json(data[0]);//wrong
    });
});
*//*
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
/*
// Login route
app.post("/login", (req, res) => {
    const { studentID, fullName, major } = req.body;
    const q = "SELECT * FROM student WHERE studentID = ? AND Name = ? AND Majors = ?";
    db.query(q, [studentID, fullName, major], (err, data) => {
        if (err) return res.json(err);
        if (data.length > 0) {
            return res.json({ status: "success", data: data[0] });
        } else {
            return res.json({ status: "fail", message: "Invalid credentials" });
        }
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


app.listen(3000, ()=>{
    console.log ("Connected to backend!")
})
