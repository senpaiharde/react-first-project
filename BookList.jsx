import { BookPreview } from "./BookPreview";
import React from "react";
import { bookService } from "../pages/bookService"; 
import { useSearchParams } from "react-router-dom";

export function BookList({ books= [], onDeleteBook}) {

    
    
    
    return (
        <ul>
            {books.map((book)=>(
                <li key={book.id}>
                <BookPreview book={book}/>
                <button onClick={()=> onDeleteBook(book.id)} className="delete-button">🗑 Delete</button>
                </li>

            ))}
        </ul>
    );
}