import React, { useEffect, useState } from 'react';
import './Pdf.scss';
import { Button } from 'antd';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Auth } from '../../api/auth'; 

// Registra las fuentes que se usarán en el PDF
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const authController = new Auth();

export const Pdf = () => {
    //obtener todos los libros
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const accessToken = await authController.getAccessToken();
                console.log("accessToken ", accessToken);
                const books_ = await authController.GetBooksComplete(accessToken);
                setAllBooks(books_);
                console.log("books complete ", books_);
            } catch (error) {
                console.error("Error al obtener todos los libros", error);
            } 
        };
        fetchAllBooks();
    }, []);
    //filtrar por libros no disponibles
    useEffect(() => {
        const availableBooks = allBooks.filter(book => book.status === false);
        setBooks(availableBooks);
    }, [allBooks]);
    //contar el total de los precios
    const totalPrices = books.length > 0 ? books.reduce((total, book) => total + parseFloat(book.price), 0) : 0;
    
    //cuerpo del pdf
    const generatePDF = async () => {
        try {
            console.log(books.map(book => parseFloat(book.price)));
            console.log("totalPrices ", totalPrices);
            const tableData = [
                ['Título', 'Autor', 'Precio'],
                ...books.map(book => [book.title, book.author, parseFloat(book.price)]),
                ['Total', '', totalPrices],
            ];

            const table = {
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto', 'auto'],
                    body: tableData,
                },
            };

            const documentDefinition = {
                content: [
                    {
                        text: 'Libros No Disponibles',
                        style: 'header',
                    },
                    table,
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10],
                    },
                },
            };

            const pdfDoc = pdfMake.createPdf(documentDefinition);
            pdfDoc.download('libros_no_disponibles.pdf');
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        }
    };
    return (
        <div>
            <Button type="primary" onClick={generatePDF}>
                Generar PDF
            </Button>
        </div>
    )
}


