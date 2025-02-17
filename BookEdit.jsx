

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link }from "react-router-dom";
import { bookService } from "./bookService";

export function BookEdit() {

    const {bookId} = useParams();
    const navigate = useNavigate();

    const [book,setBook] = useState({
        title: "",
        description: "",
        thumbnail: "",
        listPrice: {amount:"",currencyCode:"USD",isOnSale:false },


    });
    
    useEffect(()=>{
        if(bookId){
            const existingBook = bookService.getBookById(bookId);
            if(existingBook) setBook(existingBook);
        }
    },[bookId]);
    
    function handleChangeBook(event) {
        const {name, value, type,checked} = event.target;

        setBook ((prevBook)=> {
            if(name === "amount"){
                return {
                    ...prevBook,
                    listPrice: {...prevBook.listPrice, 
                        amount: value === "" ? "" : +value 
                    }
                };
            }else if (name === "isOnSale"){
                return{
                    ...prevBook,
                    listPrice: {...prevBook.listPrice, isOnSale: checked}
                };
            }else{
                return{
                    ...prevBook, [name]:value
                };
            }
        });

        

    }

    function onSaveBook(event) {
        event.preventDefault(); 
        bookService.saveBook(book);
        navigate("/book");
    }
    

    return(
        <div className="add-book-container">
            <h1>Add a New Book</h1>
            <p>Fill out the form below to add a new book to the collection.</p>
            <h2>{bookId ? "Edit Book" : "Add New Book"}</h2>
            <form onSubmit={onSaveBook}>
                <label>
                    Title:
                    <input 
                    type="text" 
                    name="title" 
                    value={book.title} 
                    onChange={handleChangeBook} required/>
                    <br />
                </label>

                <label>
                    Description:
                    <textarea 
                    type="text" 
                    name="description" 
                    value={book.description} 
                    onChange={handleChangeBook} required> </textarea>
                    <br />
                </label>

                <label>
                    Thumbnail URL:
                    <input 
                    type="text"
                     name="thumbnail" 
                     value={book.thumbnail}
                      onChange={handleChangeBook} required />
                    <br />
                    
                </label>
                
                <label>
                    Price:
                    <input 
                    type="number" 
                    name="amount" 
                    onChange={handleChangeBook} 
                    value={book.listPrice.amount} required/>
                    <br />
                </label>

                <label>
                 On Sale:
                    <input 
                    type="checkbox" 
                    name="isOnSale" 
                    onChange={handleChangeBook} 
                    checked={book.listPrice.isOnSale}/>
                    <br />
                </label>
                <button type="submit">Save</button>
            </form>
            <button onClick={()=>navigate('/book')}>Cancel</button>
        </div>
    );

}