export const googleBookService = {
    searchGoogleBooks,
    addGoogleBook
};


const sampleBooks = [
    {
        id: "1",
        volumeInfo: {
            title: "The Great Gatsby",
            authors: ["F. Scott Fitzgerald"],
            publishedDate: "1925",
            description: "A novel set in the Jazz Age.",
            imageLinks: { thumbnail: "https://via.placeholder.com/150" }
        }
    },
    {
        id: "2",
        volumeInfo: {
            title: "Moby Dick",
            authors: ["Herman Melville"],
            publishedDate: "1851",
            description: "The story of Captain Ahab and the white whale.",
            imageLinks: { thumbnail: "https://via.placeholder.com/150" }
        }
    }
];


async function searchGoogleBooks(query) {
    if (!query) return [];

    try {
        const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
        const response = await fetch(API_URL);
        const data = await response.json();

        
        return data.items || sampleBooks;
    } catch (error) {
        console.error("Failed to fetch books:", error);
        return sampleBooks; 
    }
}


async function addGoogleBook(googleBook) {
    let allBooks = JSON.parse(localStorage.getItem("books")) || [];

    
    if (allBooks.some((book) => book.id === googleBook.id)) {
        console.warn("Book already exists in the database");
        return;
    }

    
    const newBook = {
        id: googleBook.id,
        title: googleBook.volumeInfo.title,
        subtitle: googleBook.volumeInfo.subtitle || "",
        authors: googleBook.volumeInfo.authors || ["Unknown"],
        publishedDate: googleBook.volumeInfo.publishedDate || "Unknown",
        description: googleBook.volumeInfo.description || "No description available.",
        pageCount: googleBook.volumeInfo.pageCount || 0,
        categories: googleBook.volumeInfo.categories || ["Unknown"],
        thumbnail: googleBook.volumeInfo.imageLinks?.thumbnail || "",
        language: googleBook.volumeInfo.language || "Unknown",
        listPrice: {
            amount: Math.floor(Math.random() * 100) + 10,
            currencyCode: "USD",
            isOnSale: Math.random() > 0.5
        },
        reviews: []
    };

    
    allBooks.push(newBook);
    localStorage.setItem("books", JSON.stringify(allBooks));
}
