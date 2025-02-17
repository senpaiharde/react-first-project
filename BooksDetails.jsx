import { bookService } from "./bookService.js"
import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams, useNavigate, } from "react-router-dom";
import { AddReview } from "../cmps/AddReivew.jsx";



export function BookDetails() {

    const {bookId} = useParams();
    const navigate = useNavigate();
    const [book, setbook] = useState(null);

    useEffect(()=>{
       const fetchedBook =  setbook(bookService.getBookById(bookId));
       if(fetchedBook){
        setbook(fetchedBook);
        
       }else{
        console.warn("book not found with ID:", bookId);
       }
    },[bookId]);

    function handleReviewAdded() {
        setbook( {...bookService.getBookById(bookId) });

        
    }

    function handleDeleteReview(reviewId) {
        bookService.deleteReview(bookId, reviewId);
        setbook(bookService.getBookById(bookId));
        
    }

    if (!book) {
        return (
            <div className="book-not-found">
                <h1>Book not found</h1>
                <Link to="/book" className="back-button">⬅ Back to Books</Link>
            </div>
        );
    }

    return(
        <div className="books-Details"> 
        <h1 className="books-title">{book.title}</h1>
        {book.thumbnail ? (<img src={book.thumbnail} alt={book.title} className="books-title" />)
        : (<p> No IMage Available</p>)}

        
        {book.listPrice ? 
        (<p className={`price ${book.listPrice.amount > 50 ? "expensive" : "cheap"}`}>
            💲 Price:{book.listPrice.amount} {book.listPrice.currencyCode} </p>)
        : (<p> Price not avilable</p>)}
        

        <p className="book-description">{book.description}</p>
        <AddReview bookId={bookId} onReviewAdded={handleReviewAdded}/>
        <h3>Reviews:</h3>
        {book.reviews && book.reviews.length > 0 ? (
            <ul className="review-list">
                {book.reviews.map((review)=> (
                    <li key={review.id} className="review-item">
                        <p><strong>{review.fullName}</strong></p>
                        <p>Rating: {"⭐".repeat(review.rating)}</p>
                        <p>Read At: {review.readAt}</p>
                        <button onClick={()=> handleDeleteReview(review.id)}>❌ Delete</button>
                    </li>
                ))}
            </ul>
        ): (
            <p>no Reviews yet.</p>
        )}
        <button onClick={()=> navigate('/book')}>Back to Books</button>

        </div>
    );
}