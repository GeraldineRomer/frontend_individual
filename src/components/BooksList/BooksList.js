import React, { createContext, useContext, useState } from 'react';

const SelectedBooksContext = createContext();

export function BooksProvider({ children }) {
    const [selectedBooksCheck, setSelectedBooksCheck] = useState([]);

    const bookAdd = (book) => {
        console.log("book en context ", book);
        setSelectedBooksCheck((prevSelectedBooks) => {
            console.log("Libro que se está intentando agregar: ", book);
            return [...prevSelectedBooks, book];
        });
    };

    const bookRemove = (bookId) => {
        setSelectedBooksCheck((prevSelectedBooks) =>
            prevSelectedBooks.filter((selectedBook) => selectedBook._id !== bookId)
        );
    };

    return (
        <SelectedBooksContext.Provider
            value={{ selectedBooksCheck, bookAdd, bookRemove }}
        >
            {children}
        </SelectedBooksContext.Provider>
    );
}

export function useSelectedBooks() {
    return useContext(SelectedBooksContext);
}
