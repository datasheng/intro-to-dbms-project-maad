import React from 'react'
<<<<<<< HEAD
//import { useEffect } from 'react'
//import { useState } from 'react'
//import axios from 'axios'
import { Link } from "react-router-dom"


//import './Home.css'; // Assuming you have a CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to EnrollHub</h1>
        <p>Your comprehensive web application for student course enrollment.</p>
      </header>
      <nav className="home-nav">
        <ul>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/instructor">Instructors</Link></li>
          <li><Link to="/add_Course">Add Course</Link></li>
          <li><Link to="/update">Update</Link></li>
          <li><Link to="/students">Students</Link></li>
        </ul>
      </nav>
      <footer className="home-footer">
        <p>&copy; 2024 EnrollHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;

=======
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const Home = () => {
/**    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllBooks()
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8800/books/" + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
        <h1>Devin's Book Shop</h1>
        <div className="books">
            {books.map(book => (
                <div className="book" key={book.id}>
                    {book.cover && <img src={book.cover} alt="" />}
                    <h2>{book.title}</h2>
                    <p>{book.desc}</p>
                    <span>{book.price}</span>
                    <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
                    <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
                </div>
            ))}
            </div>
            <button><Link to="/add">Add new book</Link></button>
    </div>
    )
};
 */
export default Home
>>>>>>> c5c391d49468f76c96ce8bb31bd3c0b4903a98c6
