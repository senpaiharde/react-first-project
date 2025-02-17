import React,{ useCallback, useEffect, useState } from "react";
import { bookService } from "../pages/bookService";
import { Await } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { googleBookService } from "./googleBookService";

import { debounce } from "lodash";



export function BookAdd() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);

    const fetchBooks = useCallback(
        debounce(async (query) => {
            if(!query)return setResults([]);
            try{
                const books = await googleBookService.searchGoogleBooks(query);
                setResults(books);
            }catch(err){
                console.log("error fetching google books: ", err);
                
            }
        }, 500),[]
    );



       
       useEffect(()=>{
        const query = searchParams.get('q');
        if(query && query !== searchTerm){
            setSearchTerm(query);
            fetchBooks(query);
        }
       }, [searchParams, fetchBooks]);

       function handleSearchChange(event) {
        const value = event.target.value;
        setSearchTerm(value);

        if(!value) return setResults([]);
        else {
            setSearchParams({q:value});
            fetchBooks(value);
        }
        
       }


       async function handleAddBook(googleBook) {
        try {
            await googleBookService.addGoogleBook(googleBook);
            alert(`${googleBook.volumeInfo.title} added successfully`);
        } catch (err) {
            console.error("Error adding book: ", err);
        }
        
       }


    return(
        <div className="book-add">
            <h2>📚 Search for Books</h2>
            <input
            value={searchTerm}
            type="text"
            onChange={handleSearchChange}
            placeholder="Search Google Books"
            />

            <ul className="search-results">
                {results.length > 0 ? (
                    results.map((book) => (
                        <li key={book.id}>
                            <strong>{book.volumeInfo.title}</strong>
                            <button onClick={() => handleAddBook(book)}>➕ Add</button>
                        </li>
                    ))
                ) : (
                    <p>No books found.</p>
                )}
            </ul>
        </div>
    );
}