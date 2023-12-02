import React, { useEffect, useState } from 'react';
import './ListCategories.scss';
import { Box, Grid, Paper, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import { Button, Modal } from 'antd';
import { Categorias } from '../Categorias/Categorias';
import { Auth } from '../../../api/auth'; 

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

export const ListCategories = () => {
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

    //obtener categorias
    const [categories, setCategories] = useState([]);
    const [token,setToken] = useState(null);
    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const accessToken = await authController.getAccessToken();
                console.log("access token dentro de libros -> " + accessToken);
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

    return (
        <div>
            <Grid container spacing={0}>    
            <TableContainer component={Paper} aria-label="customized table" className='table-container'>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nombre</StyledTableCell>
                            <StyledTableCell align="center">Activo</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {categories.map((category, index) => ( 
                        <StyledTableRow key={index}>
                            <StyledTableCell align="center">{category.name}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Switch
                                    checked={category.active} 
                                />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
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
            </Grid>
            </Grid>
        </div>
    )
}
