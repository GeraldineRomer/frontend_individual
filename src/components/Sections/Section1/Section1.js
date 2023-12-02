import React, { useEffect, useState } from 'react'
import './Section1.scss';
import Slider from '../../Slider/Slider';
import { useSelectedBooks } from '../../BooksList/BooksList';

export const Section1 = () => {
    //contexto para obtener los libros que fueron check
    const { selectedBooksCheck } = useSelectedBooks();
    useEffect(() => {
        // Esto se ejecutará cada vez que selectedBooksCheck cambie
        console.log("Lista de libros actualizada:", selectedBooksCheck);
    }, [selectedBooksCheck]);
    return (
        <div className="Section1">
            <Slider libros={selectedBooksCheck}/>
        </div>
    )
}
