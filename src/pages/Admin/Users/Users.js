import React, { useEffect, useState } from 'react';
import './Users.scss';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import { MenuAdmin } from '../../../components/MenuAdmin/MenuAdmin';
import { GetUsers, toggleUserRole } from '../../../api/admin';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import { Auth } from '../../../api';

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
    
export const Users = () => {
    
    const users = GetUsers();

    const [token,setToken] = useState(null)
    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const accessToken = await authController.getAccessToken();
                console.log("access token dentro de Users -> " + accessToken);
                setToken(accessToken);
            } catch (error) {
                console.error("Error al obtener la sesión del usuario", error);
            }
        };
        checkUserSession();
    }, []);
    
    const handleToggleUserRole = async (userId, currentActiveStatus) => {
        await toggleUserRole(userId, currentActiveStatus, token, users);
    };


    return (
        <div className='Users'>
            <MenuAdmin/>
            <TableContainer component={Paper} aria-label="customized table" className='table-container'>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Nombre</StyledTableCell>
                            <StyledTableCell align="center">Apellido</StyledTableCell>
                            <StyledTableCell align="center">Tipo Documento</StyledTableCell>
                            <StyledTableCell align="center">Documento</StyledTableCell>
                            <StyledTableCell align="center">Pais</StyledTableCell>
                            <StyledTableCell align="center">Departamento</StyledTableCell>
                            <StyledTableCell align="center">Municipio</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Role</StyledTableCell>
                            <StyledTableCell align="center">Active</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => ( // Itera sobre la lista de usuarios y muestra cada usuario en una fila de la tabla
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center">{user.firstname}</StyledTableCell>
                                <StyledTableCell align="center">{user.lastname}</StyledTableCell>
                                <StyledTableCell align="center">{user.document_type}</StyledTableCell>
                                <StyledTableCell align="center">{user.document}</StyledTableCell>
                                <StyledTableCell align="center">{user.country}</StyledTableCell>
                                <StyledTableCell align="center">{user.department}</StyledTableCell>
                                <StyledTableCell align="center">{user.municipality}</StyledTableCell>
                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                <StyledTableCell align="center">{user.role}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {user.active ? 
                                        <ToggleOffIcon className='off-icon' onClick={() => handleToggleUserRole(user._id, user.active)} /> 
                                        : 
                                        <ToggleOnIcon className='on-icon' onClick={() => handleToggleUserRole(user._id, user.active)} />
                                    }
                                </StyledTableCell>
                                {/* Agrega aquí las celdas para los otros campos del usuario */}
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

