import React, { useEffect, useState} from "react";

 

export function RateByStars({ val, onSelected }) {
    return(
        <div>
            {[1,2,3,4,5].map((star)=>(
            <span key={star} style={{cursor:"pointer",
                                     fontSize:"24px",
                                     color:star <= val ? "gold" : "gray"
            }} 
            onChange={(e)=> onSelected(star)}>

            </span>
        ))} 
        </div>
    );
    
}