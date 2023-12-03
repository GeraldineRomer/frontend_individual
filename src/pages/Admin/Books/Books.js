import React, { useEffect, useState } from 'react';
import './Books.scss';
import { Alert, Autocomplete, Box, Checkbox, Grid, Pagination, Paper, Stack, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography, styled, tableCellClasses } from '@mui/material';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { Categorias } from '../Categorias/Categorias';
import { Auth } from '../../../api/auth'; 
import { RegisterBooks } from '../RegisterBooks/RegisterBooks';
import { useSelectedBooks } from '../../../components/BooksList/BooksList';

const authController = new Auth();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
    border: 0,
    },
}));

export const Books = () => {
    const [books, setBooks] = useState([]);
    const [bookscomplete, setBooksComplete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const booksPerPage = 10;
    
    //obtener token
    const [token,setToken] = useState(null);
    //filtrar categorias
    const [categories, setCategories] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [value, setValue] = useState(null);

    //loadings
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [loadingAllBooks, setLoadingAllBooks] = useState(true);

    //obtener categorias
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const accessToken = await authController.getAccessToken();
                setToken(accessToken);
                console.log("accessToken ", accessToken);
            } catch (error) {
                console.error("Error al obtener el token", error);
                setLoadingCategories(false);
                setLoadingBooks(false);
            }
        };
        fetchToken();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!token) return; // No hacer nada si no se ha obtenido el token

                const categoriesData = await authController.getCategories(token);
                setCategories(categoriesData);
                console.log("categories ", categories);

                // Al obtener las categorías, establece 'Todos' como la selección por defecto en el Autocomplete
                if (categoriesData.length > 0) {
                    setValue(categoriesData[categoriesData.length - 1]);
                }

                const { results, next } = await authController.GetBooks(currentPage, booksPerPage, token);
                setBooks(results);
                console.log("books ", results);
                setTotalPages(next ? next.page : 0);
                setFilteredBooks(results);
                // Cambiar el estado de loadingBooks y loadingCategories a false después de todas las operaciones
                setLoadingCategories(false);
                setLoadingBooks(false);
            } catch (error) {
                console.error("Error al obtener datos iniciales", error);
                setLoadingCategories(false);
                setLoadingBooks(false);
            }
        };

        fetchData();
    }, [token, currentPage, booksPerPage]);

    //obtener todos los libros sin página
    const [activatedCount, setActivatedCount] = useState(0);
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const books_ = await authController.GetBooksComplete(token);
                setBooksComplete(books_);
                setLoadingAllBooks(false);
                console.log("books complete ", bookscomplete);

                // Calcular el conteo total de libros activados
                const updatedActivatedCount = books_.reduce((acc, book) => {
                    return book.active ? acc + 1 : acc;
                }, 0);
                console.log("updatedActivatedCount ", updatedActivatedCount);
                setActivatedCount(updatedActivatedCount);
                if (updatedActivatedCount > 6) {
                    setAlert({ type: 'warning', message: 'Haz excedido el límite ' });
                    return;
                } else if (updatedActivatedCount < 6){
                    console.log("noo excedí la cantidad de activados ");
                    setAlert({ type: 'warning', message: 'Faltan libros por mostrar' }); // Ocultar la alerta si no se excede el límite
                } else {
                    setAlert({ type: '', message: '' });
                }
            } catch (error) {
                console.error("Error al obtener todos los libros", error);
            } finally {
                setLoadingAllBooks(false);
            }
        };
        fetchAllBooks();
    }, [token]);

    
    const handlePageChange = (event, value) => {
        console.log("value", value);
        setCurrentPage(value);
    }; 

    //mostrar modal para agregar categoria
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    //mostrar libros por filtros
    const handleAutocompleteChange = (event, newValue) => {
        setValue(newValue); // Actualizar valor seleccionado en el Autocomplete
        console.log("value ", value);
        if (newValue === null) {
            // Si se borra la selección, mostrar todos los libros
            setFilteredBooks(bookscomplete);
            setSelectedCategory(null);
        } else if (newValue.name === 'Todo') {
            setFilteredBooks(books);
        } else {
        setSelectedCategory(newValue);
        const booksForSelectedCategory = bookscomplete.filter(book => {
            return book.category._id === newValue._id;
        });
        setFilteredBooks(booksForSelectedCategory); // Mostrar libros de la categoría seleccionada
    }
    };

    //cambiar estado de libros
    // Estado para la cantidad de libros activados
    const [allBooks, setAllBooks] = useState([]); 
    const [alert, setAlert] = useState({ type: '', message: '' });
    const handleActiveCheckboxChange = async (event, bookId) => {
        try {
            const updatedBooks = filteredBooks.map(book => {
                if (book._id === bookId) {
                    const updatedBook  = { ...book, active: !book.active };
                    updateBookData(bookId, updatedBook);
                    return updatedBook;
                }
                return book;
            });
            setFilteredBooks(updatedBooks);
            console.log("setFilteredBooks ", updatedBooks);
            // Calcular el conteo total de libros activados
            const updatedActivatedCount = updatedBooks.reduce((acc, book) => {
                return book.active ? acc + 1 : acc;
            }, 0);
            console.log("updatedActivatedCount ", updatedActivatedCount);
            //setActivatedCount(updatedActivatedCount);
            // Mostrar alerta si se excede el límite de 6 libros activados
            if (updatedActivatedCount > 6) {
                console.log("excedí la cantidad de activados ");
                setAlert({ type: 'warning', message: 'Haz excedido el límite de libros a mostrar' });
            } else if (updatedActivatedCount < 6){
                console.log("noo excedí la cantidad de activados ");
                setAlert({ type: 'warning', message: 'Faltan libros por mostrar' }); // Ocultar la alerta si no se excede el límite
            } else {
                setAlert({ type: '', message: '' });
            }
            console.log("updatedTotalActivatedCount ", updatedActivatedCount);
        } catch (error) {
            console.error("Error al actualizar el estado del libro:", error);
        }
    };

    const updateBookData = async (bookId, updatedBook) => {
        try {
            const accessToken = await authController.getAccessToken();
            await authController.ActiveBooks(bookId, updatedBook, accessToken);
            console.log(`Estado actualizado para el libro con ID: ${bookId}`);
        } catch (error) {
            console.error("Error al actualizar el libro:", error);
        }
    };

    //cambiar la disponibilidad del libro
    const [valueAvailable, setValueAvailable] = useState(null);
    const handleActiveSwitchChange = async (event, bookId) => {
        try {
            const updatedBooks = filteredBooks.map(book => {
                if (book._id === bookId) {
                    const updatedBook  = { ...book, status: !book.status };
                    updateStatusBookData(bookId, updatedBook);
                    return updatedBook;
                }
                return book;
            });
            setFilteredBooks(updatedBooks);
            console.log("setFilteredBooks ", updatedBooks);
        } catch (error) {
            console.error("Error al actualizar la disponibilidad del libro:", error);
        }
    };

    const updateStatusBookData = async (bookId, updatedBook) => {
        try {
            const accessToken = await authController.getAccessToken();
            await authController.StatusBooks(bookId, updatedBook, accessToken);
            console.log(`Estado actualizado para el libro con ID: ${bookId}`);
        } catch (error) {
            console.error("Error al actualizar el libro:", error);
        }
    };

    const handleAvailabilityChange = (event, newValue) => {
        setValueAvailable(newValue); // Actualizar valor seleccionado en el Autocomplete
    
        if (newValue === null) {
            // Si se borra la selección, mostrar todos los libros
            setFilteredBooks(bookscomplete);
        } else if (newValue.name === 'Disponible') {
            const availableBooks = bookscomplete.filter(book => book.status === true);
            setFilteredBooks(availableBooks); // Mostrar libros disponibles
        } else if (newValue.name === 'No disponible') {
            const unavailableBooks = bookscomplete.filter(book => book.status === false);
            setFilteredBooks(unavailableBooks); // Mostrar libros no disponibles
        }
    };

    return (
        <div>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Autocomplete
                    value={value}
                    onChange={handleAutocompleteChange}
                    options={categories.filter(category => category.active)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Categorías" />}
                />
            </Box>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Autocomplete
                    value={valueAvailable}
                    onChange={handleAvailabilityChange}
                    options={[
                        { name: 'Disponible' },
                        { name: 'No disponible' },
                        // Agrega más opciones si es necesario
                    ]}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Disponibilidad" />}
                />
            </Box>
                <Grid container spacing={0}>    
                <TableContainer component={Paper} aria-label="customized table" className='table-container' value={value}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Portada</StyledTableCell>
                                <StyledTableCell align="center">Título</StyledTableCell>
                                <StyledTableCell align="center">Autor</StyledTableCell>
                                <StyledTableCell align="center">Descripción</StyledTableCell>
                                <StyledTableCell align="center">Precio</StyledTableCell>
                                <StyledTableCell align="center">Disponible</StyledTableCell>
                                <StyledTableCell align="center">Activo</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {filteredBooks.map((book, index) => ( 
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center">
                                    <img 
                                        src={`data:image/png;base64,${book.images[0]}`} 
                                        alt={book.title} 
                                        style={{ width: '100px', height: '100px' }} 
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">{book.title}</StyledTableCell>
                                <StyledTableCell align="center">{book.author}</StyledTableCell>
                                <StyledTableCell align="center">{book.description}</StyledTableCell>
                                <StyledTableCell align="center">{book.price}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Switch
                                        checked={book.status} 
                                        onChange={(event) => handleActiveSwitchChange(event, book._id)}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Checkbox 
                                        checked={book.active} 
                                        onChange={(event) => handleActiveCheckboxChange(event, book._id)}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid item md={12} xs={12}>
                    <Button type="primary" onClick={showModal}>
                        Agregar Categoría
                    </Button>
                    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <Categorias/>
                    </Modal>
                    <Button type="primary" onClick={showModal}>
                        Agregar Libro
                    </Button>
                    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <RegisterBooks/>
                    </Modal>
                    <Button type="primary" >
                        Publicar
                    </Button>
                    {alert.type === 'warning' && (
                        <Alert variant="outlined" severity="error">
                            {alert.message}
                        </Alert>
                    )}
                </Grid>
                    <Grid item md={12} xs={12}>
                        <Stack spacing={2} className='pagination'>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                className='pages'
                            />
                        </Stack>
                    </Grid>
                </Grid>
        </div>
    )
}
