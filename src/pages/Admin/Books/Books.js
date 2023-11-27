import React, { useEffect, useState } from 'react';
import './Books.scss';
import { Box, Grid, Pagination, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography, styled, tableCellClasses } from '@mui/material';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import PropTypes from 'prop-types';
import { Button, Modal } from 'antd';
import { Categorias } from '../Categorias/Categorias';
import { Auth } from '../../../api/auth'; 
import { RegisterBooks } from '../RegisterBooks/RegisterBooks';

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
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export const Books = () => {
    const [userActive, setUserActive] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const usersPerPage = 5;
    
    //obtener token
    const [token,setToken] = useState(null);
    //filtrar categorias
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const accessToken = await authController.getAccessToken();
                setToken(accessToken);
                console.log("access token dentro de libros -> " + token);
                //obtener categorias
                const categoriesData = await authController.getCategories(accessToken);
                setCategories(categoriesData);
                console.log("categorias -> " + categoriesData);
            } catch (error) {
                console.error("Error al obtener la sesión del usuario", error);
            }
        };
        checkUserSession();
    }, []);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    //obtener libros por 5 en paginacion
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { results, next } = await GetUsers(currentPage, usersPerPage);
                setUsers(results);
                setTotalPages(next ? next.page : 0);
            } catch (error) {
                console.error(error);
            }
        };
        console.log("users -> ", users);
        console.log("pages -> ", totalPages);
        const checkUserSession = async () => {
            try {
                const accessToken = await authController.getAccessToken();
                console.log("access token dentro de Users -> " + accessToken);
                setToken(accessToken);
            } catch (error) {
                console.error("Error al obtener la sesión del usuario", error);
            }
        };
        
        fetchData();
        checkUserSession();
    }, [currentPage]);

    /* const handleToggleUserRole = async (userId, currentActiveStatus) => {
        await toggleUserRole(userId, currentActiveStatus, token, users);
        setUserActive(prevState => !prevState);
    }; */

    const handlePageChange = (event, value) => {
        console.log("value", value);
        setCurrentPage(value);
    }; 

    const [value, setValue] = React.useState(0);


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

    return (
        <div>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    {categories.map((category, index) => (
                        <Tab key={index} label={category.name} />
                    ))}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
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
                            
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid md={12} xs={12}>
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
            </CustomTabPanel>
        </div>
    )
}
