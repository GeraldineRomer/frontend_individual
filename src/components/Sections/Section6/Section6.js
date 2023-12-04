import React, { useEffect, useState } from 'react';
import './Section6.scss';
import { Auth } from '../../../api/auth'; 
import Slider from '../../Slider/Slider';

const authController = new Auth();

export const Section6 = () => {
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
        const availableBooks = allBooks.filter(book => book.status === true && book.active);
    
        // Actualizar la lista de libros para el slider con los libros disponibles
        setBooks(availableBooks);
    }, [allBooks]);
    return (
        <div className="Section6">
            <Slider libros={books}/>
        </div>
    )
}

