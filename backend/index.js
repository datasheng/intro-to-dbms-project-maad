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
            return res.json({ status: "success", data: data[0] });
        } else {
            return res.json({ status: "fail", message: "Invalid credentials" });
        }
    });
});


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
