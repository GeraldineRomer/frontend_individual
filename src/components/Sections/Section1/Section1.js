import React, { useEffect, useState } from 'react'
import './Section1.scss';
import Slider from '../../Slider/Slider';
import { useSelectedBooks } from '../../BooksList/BooksList';
import { Auth } from '../../../api/auth'; 

const authController = new Auth();

export const Section1 = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const books_ = await authController.GetBooksComplete();
                setAllBooks(books_);
                console.log("books complete ", books_);
            } catch (error) {
                console.error("Error al obtener todos los libros", error);
            } 
        };
        fetchAllBooks();
    }, []);

    useEffect(() => {
        // Obtener solo los libros disponibles
        const availableBooks = allBooks.filter(book => book.status === true);
    
        // Actualizar la lista de libros para el slider con los libros disponibles
        setBooks(availableBooks);
    }, [allBooks]);

    return (
        <div className="Section1">
            <Slider libros={books}/>
        </div>
    )
}
