import React, { useEffect, useState} from "react";
import { bookService } from "../pages/bookService";
import { RateBySelect } from "./RateBySelect";
import { RateByStars } from "./RateByStars";
import { RateByTextBox } from "./RateByTextBox";

export function AddReview({bookId, onReviewAdded}) {
    const [review, setReview] = useState({
        id:Date.now().toString(),
        fullName: "",
        rating: "3",
        readAt: "",

    });

    const [ratingType, setRatingType] = useState("stars");

    function handleChange({target}) {
        const {name, value} = target;
        setReview((prevReview)=> ({...prevReview,[name]: value}));
    }


    function handleRatingChange(value) {
        setReview((prevReview)=> ({...prevReview, rating:value}))
        
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!review.fullName || !review.readAt) return;

        bookService.addReview(bookId, review);
            onReviewAdded();

            setReview({ id:Date.now().toString(),
                fullName: "",
                rating: "3",
                readAt: ""
            });

    }

    return (
        <form onSubmit={handleSubmit} className="review-form">

            <h3>Add a Review</h3>
            <label> full Name
                <input
                type="text"
                name="fullName"
                value={review.fullName}
                onChange={handleChange}
                required/>
            </label>
            <fieldset>
                <legend>choose Rating Method:</legend>
                <label> 
                <input  
                checked={ratingType === "select"} value="select" type="radio"
                 name="ratingType" onChange={()=> setRatingType("select")}
                    />
                    dropdown Select
                 </label>

                <label> 
                <input 
                 checked={ratingType === "textbox"} value="textbox" type="radio" 
                name="ratingType" onChange={()=> setRatingType("textbox")}
                    />
                    textbox Input
                </label>

                <label>
                <input  checked={ratingType === "stars"} value="stars" type="radio" 
                name="ratingType" onChange={()=> setRatingType("stars")} 
                />
                star Rating
                </label>
            </fieldset>

            <label>Rating:</label>
            {ratingType === "select" && <RateBySelect val={review.rating} onSelected={handleRatingChange}/>}
            {ratingType === "textbox" && <RateByTextBox val={review.rating} onSelected={handleRatingChange}/>}
            {ratingType === "stars" && <RateByStars val={review.rating} onSelected={handleRatingChange}/>}


            <label>Read At:
                <input
                type="date"
                name="readAt"
                value={review.readAt}
                onChange={handleChange}
                required
        
                />
            </label>

            <button type="submit">Submit Review</button>
        </form>
    )
    
}
