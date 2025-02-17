import React, { useEffect, useState} from "react";
import { bookService } from "../pages/bookService";
import { data } from "react-router-dom";

export function RateByTextBox({ val, onSelected }) {
    return (
       <input type="number" min="1" max="5" value={val} onChange={(e)=> onSelected(Math.max(1, Math.min(5, e.target.value)))}/>
    );
    
}