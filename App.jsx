import React from "react";
import { Link, Outlet, useParams, useNavigate, } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AboutUs } from "./pages/AboutUs";
import { BookIndex } from "./pages/BookIndex";
import { BookDetails } from "./pages/BooksDetails";
import { BookEdit } from "./pages/BookEdit";
import "./style/main.css";
import { UserMsg } from "./cmps/UserMsg";
import { BookAdd } from "./services/BookAdd";



export function App() {
    return (
        <>
            <nav>
                <NavLink to="/">Home</NavLink> | 
                <NavLink to="/about">About</NavLink> | 
                <NavLink to="/book">Books</NavLink> |
                <NavLink to="/book/edit">Add Book</NavLink>
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/book" element={<BookIndex />} />
                <Route path="/book/:bookId" element={<BookDetails />} />
                <Route path="/book/edit/:bookId" element={<BookEdit />} />
                <Route path="/book/edit" element={<BookEdit />} />
                <Route path="/book/add" element={<BookAdd />} />
            </Routes>


            <UserMsg/>
        </>
    );
}