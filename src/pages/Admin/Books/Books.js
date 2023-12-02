import React, { useEffect, useState } from 'react';
import './Books.scss';
import { Autocomplete, Box, Checkbox, Grid, Pagination, Paper, Stack, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography, styled, tableCellClasses } from '@mui/material';
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

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
    <div
        role="tabpanel1" // Corregí el valor del atributo role
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`} // Corregí el atributo aria-aria-labelledby a aria-labelledby
        {...other}
    >
        {value === index && (
        <Box sx={{ p: 4 }}>
            <Typography style={{fontFamily:'MontaguSlab', fontSize: '18px'}}>{children}</Typography>
        </Box>
        )}
    </div>
    );
}

export const Books = () => {
    const [books, setBooks] = useState([]);
    const [bookscomplete, setBooksComplete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const booksPerPage = 5;
    
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
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const books_ = await authController.GetBooksComplete(token);
                setBooksComplete(books_);
                console.log("books complete ", bookscomplete);
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

    return (
        <div>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Autocomplete
                    value={value}
                    onChange={handleAutocompleteChange}
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Categorías" />}
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
                                <StyledTableCell align="center">
                                    <Switch
                                        checked={book.status} 
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Checkbox 
                                        checked={book.active} 
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
