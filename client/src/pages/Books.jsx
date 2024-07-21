import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:3000/books");
                setBooks(res.data);  // Set the fetched data to the books state
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllBooks();
    }, []); // Correctly place the dependency array here

    return (
        <div>
            <h1>Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <Link to={`/books/${book.id}`}>{book.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Books;


/*
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
//import { Link } from "react-router-dom"


const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:3000/books");
                setBooks(res.data);  // Set the fetched data to the books state
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllBooks();
    }, []); // Correctly place the dependency array here

    return (
        <div>
            <h1>Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Books;
*/