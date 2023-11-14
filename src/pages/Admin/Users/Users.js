import React from 'react';
import './Users.scss';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material';
import { MenuAdmin } from '../../../components/MenuAdmin/MenuAdmin';
import { GetUsers } from '../../../api/admin';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

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

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

export const Users = () => {
    const users = GetUsers();

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
                                    <ToggleOffIcon/>
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

