import React, { useEffect, useState} from "react";



export function RateBySelect({ val, onSelected }) {
    return (
        <select value={val} onChange={(e)=> onSelected(e.target.value)}>
        <option value="1">⭐</option>
        <option value="2">⭐⭐</option>
        <option value="3">⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
        </select>

    );
}