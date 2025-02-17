import { Link } from "react-router-dom";
import React from "react";
import { bookService } from "../pages/bookService"; 
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
export function BookPreview({ book }) {
    
   

    return (
        <div>
            <h3>{book.title}</h3>
            <img src={book.thumbnail} alt={book.title} width="150"/>
            <p>{book.listPrice.amount} {book.listPrice.currencyCode}</p>
            <NavLink to={`/book/${book.id}`}>View Details</NavLink>
            <br />
            <NavLink to={`/book/edit/${book.id}`}>Edit</NavLink>
        </div>
    )
}