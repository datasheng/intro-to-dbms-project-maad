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
<<<<<<< HEAD
=======





/*
import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    // password: "...",     <--- put whatever your password for MySQL Workbench is and uncomment
    // database: "...."      <--- put whatever your database (schema) name for MySQL Workbench is and uncomment
});

// If there is a auth problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '...'; <--- put whatever your password for MySQL Workbench is

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is the backend");
});

app.listen(8800, () => {
    console.log("Connected to backend!")
});

/**
 * import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lamadev123",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
 * 
 * 
 * 
 */
>>>>>>> c5c391d49468f76c96ce8bb31bd3c0b4903a98c6
