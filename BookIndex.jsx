
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "./bookService.js"


export function BookIndex() {

    const [books,setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filterBy, setFilterBy] = useState({
            title: "",
            sortBy: "title"
        });

    useEffect(()=>{
        const allBooks = bookService.getBooks();
        setBooks(allBooks);
        setFilteredBooks(allBooks);
        
    },[]);

    function handleFilter(updatedFilter) {
        setFilterBy(updatedFilter);

        let updatedBooks = books;
        
    

    if(updatedFilter.title){
        updatedBooks = updatedBooks.filter((book)=> 
            book.title.toLowerCase().includes(updatedFilter.title.toLowerCase())
    );
    }

    if(updatedFilter.sortBy === "price"){
        updatedBooks = [...updatedBooks].sort((a, b) => a.listPrice.amount - b.listPrice.amount);
    }else{
        updatedBooks = [...updatedBooks].sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredBooks([...updatedBooks]);
}
   function handleDeleteBook(bookId) {
    bookService.deleteBook(bookId);
    setBooks((prevBooks) => prevBooks.filter(book=> book.id !== bookId));
    setFilteredBooks((prevBooks) => prevBooks.filter(book => book.id !== bookId));
   }

    return(
        <div className="book-index">
            <h1>📚 Explore Books 📚</h1>
            <BookFilter onFilter={handleFilter} />
            <BookList books={filteredBooks} onDeleteBook={handleDeleteBook} />
            <Link to="/book/add">📖 Add Books from Google</Link>
        </div>
    );
}    
