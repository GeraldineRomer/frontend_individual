import React, { useEffect, useState } from 'react';
import './MenuOptionsUser.scss';
import { Alert, AlertTitle, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { toggleUserRole } from '../../api/admin';
import { GetUsersComplete } from '../../api';
import { Auth } from '../../api';

const authController = new Auth();

export const MenuOptionsUser = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const [showAlertLogout, setshowAlertLogout] = useState(false); 

    const [selectedUserId, setSelectedUserId] = useState(null);
     // Nuevo estado para almacenar el ID del usuario seleccionado para activar/desactivar
    const [showAlert, setShowAlert] = useState(false);

    const users = GetUsersComplete();

    const [token,setToken] = useState(null);
    const [userActive, setUserActive] = useState(false);

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
        setUserActive(prevState => !prevState);
        setShowAlert(false);
    };
    // hacer click en "Aceptar" en el alert de cancelar la cuenta
    const handleAcceptAlert = (userId) => {
        setSelectedUserId(userId);
        setShowAlert(true);
    };

    //abrir el menu de opciones
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    //cerrar el menu de opciones
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        
        setOpen(false);
    };
    //cerrar el menu de opciones en caso de que hacer click en otro lado
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        } else if (event.key === 'Escape') {
        setOpen(false);
        }
    }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    //mostrar la alerta para cancelar la cuenta
    const handleCancelAccount = () => {
        setShowAlert(true); // Mostrar el Alert cuando se hace clic en "Cancelar Cuenta"
        setOpen(false); // Cerrar el menú de opciones
    };
    //mostrar la alerta para salir de la cuenta
    const handleLogout = () => {
        setshowAlertLogout(true);
        setOpen(false);
    };
    // Cerrar el Alert al hacer clic en "Cancelar"  del cancelar cuenta
    const handleAlertClose = () => {
        setShowAlert(false); 
    };
    // Cerrar el Alert al hacer clic en "Cancelar"  de salir de la cuenta
    const handleAlertCloseLogout = () => {
        setshowAlertLogout(false); 
    };


    return (
        <Stack direction="row" spacing={2} className='container-menu-options'>
            <div className='menu-options'>
                <KeyboardArrowDownIcon 
                className='arrow-icon'
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                />
                <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                >
                {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                    >
                    <Paper className='paper'>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                                className='menulist'
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                            >
                                <MenuItem onClick={handleCancelAccount}>Cancelar Cuenta</MenuItem>
                                <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
                </Popper>
                {/* Mostrar el Alert si showAlert es true */}
                {showAlert && (
                    <div className="center-alert">
                        <Alert severity="warning" className="custom-alert">
                            <AlertTitle>Tu cuenta será desactivada</AlertTitle>
                            Acepta para desactivar tu cuenta <strong>¿Estás seguro?</strong>
                            <div className='btn-alert'>
                                <Button variant="outlined" onClick={handleAlertClose} className='btn'>Aceptar</Button>
                                <Button variant="outlined" onClick={handleAlertClose} className='btn'>Cancelar</Button>
                            </div>
                        </Alert>
                    </div>
                )}
                {showAlertLogout && (
                    <div className="center-alert">
                        <Alert severity="warning" className="custom-alert">
                            <AlertTitle>Vas a cerrar sesión</AlertTitle>
                            Acepta para salir <strong>¿Estás seguro?</strong>
                            <div className='btn-alert'>
                                <Button variant="outlined" onClick={handleToggleUserRole} className='btn'>Aceptar</Button>
                                <Button variant="outlined" onClick={handleAlertCloseLogout} className='btn'>Cancelar</Button>
                            </div>
                        </Alert>
                    </div>
                )}
            </div>
        </Stack>
    );
}