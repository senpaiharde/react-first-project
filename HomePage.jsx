import React, { useEffect, useState } from "react";
import { bookService } from "./bookService";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

import "../style/homePage.css";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function HomePage() {
    const [bookCategories, setBookCategories] = useState({});

    useEffect(()=>{
        const books = bookService.getBooks();
        if (!books || !Array.isArray(books)) {
            console.log("no books found or invaid format");
            setBookCategories({});
            return;
        }

        const categoriesCount = books.reduce((acc, book)=>{
            if(book.categories && Array.isArray(book.categories)) {
                book.categories.forEach(category =>{
                    acc[category] = (acc[category] || 0) + 1;
                });
            }
            return acc;
        }, {});
        setBookCategories(categoriesCount);
    },[]);


    const labels = bookCategories ? Object.keys(bookCategories) : [];
    const values = bookCategories ? Object.values(bookCategories) : [];
    const chartData = {
        labels: labels.length > 0 ? labels : ["No Data"], // Default to "No Data" if empty
        datasets: values.length > 0 ? [
            {
                label: "Books per Category",
                data: values,
                backgroundColor: [
                    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
                ],
            },
        ] : [{ label: "No Data", data: [0], backgroundColor: "#ddd" }],
    };
    return (
        <section className="homepage">
            <header className="hero">
            <h1>Welcome to Miss Books</h1>
            <p>Your gateway to a world of knowledge and adventure.</p>
            </header>
            <section className="summary">
                <h2>🔥 Explore Our Collection</h2>
                <p>We have books from various genres, authors, and time periods.</p>
            </section>
            <section className="dashboard">
                <h2>📊 Book Categories Overview</h2>
                <div className="chart-container">
                <Bar data={chartData} />
                </div>
            </section>

        </section>
    )
}