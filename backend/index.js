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

//it works!! Exces Books SQL data example
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)
    })
})

// Fetch students data - works
app.get("/students", (req, res) => {
    const q = "SELECT * FROM students";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//Fetch courses data
app.get("/courses", (req, res) => {
    const q = "SELECT * FROM courses";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Fetch instructors data 
app.get("/instructors", (req, res) => {
    const q = "SELECT * FROM instructors";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Fetch registration data 
app.get("/registrations", (req, res) => {
    const q = "SELECT * FROM registrations";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// Fetch sections data 
app.get("/sections", (req, res) => {
    const q = "SELECT * FROM sections";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
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
