import { Link, Outlet } from "react-router-dom";  // ✅ Correct import


import React, { useState, useEffect } from "react";



export function BookFilter({ onFilter }) {
    const [filterBy, setFilterBy] = useState({
        title: "",
        sortBy: "title"
    });
    const [scrollProgress, setScrollProgress] = useState(0);


    function handleChange({ target }) {
        const { name, value } = target;
        setFilterBy((prevFilter) => ({ ...prevFilter, [name]: value }));
        onFilter({ ...filterBy, [name]: value });
    }

    useEffect(()=> {
        const handleScroll = () => {
            let scrollY = window.scrollY;
            let maxscoll = 150;
            let pregress = Math.min(scrollY / maxscoll, 1);
            setScrollProgress(pregress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)

        

    },[]);
    return (
        <>
         <div className="search-container">
         <div className="search-transition" style=
         {{ transform: `translate(${scrollProgress * 300}px,
          ${scrollProgress * -40}px) scale(${1 - scrollProgress * 0.5})`,
           opacity: `${1 - scrollProgress}` }}>

                <input
                    type="text"
                    className="input"
                    name="title"
                    placeholder="Search for a book..."
                    value={filterBy.title}
                    onChange={handleChange}
                />
                <div id="filter-icon">
                    <div className="filterBorder"></div>
                </div>
            </div>

            <div className="sort-container">
                <label>Sort By:</label>
                <select name="sortBy" onChange={handleChange} value={filterBy.sortBy}>
                    <option value="title">Title</option>
                    <option value="price">Price</option>
                </select>
            </div>
        </div>


        <div className="fixed-search" style={{ opacity: scrollProgress,
             transform: `translateX(${(1 - scrollProgress) * 100}px)` }}>
            <div className="search-icon"></div>
            <input
            type="text"
            className="mini-input"
            name="title"
            placeholder="Search..."
            value={filterBy.title}
            onChange={handleChange}
            />
        </div>
        </>
    );
}