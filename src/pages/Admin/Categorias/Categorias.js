import React, { useEffect, useState } from 'react';
import './Categorias.scss';
import { Switch, TextField } from '@mui/material';
import { Button } from 'antd';
import { Auth } from '../../../api/auth'; 

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const authController = new Auth();

export const Categorias = () => {
    //obtener el token para poder crear la categoría
    const [token,setToken] = useState(null);
    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const accessToken = await authController.getAccessToken();
                console.log("access token dentro de categorias -> " + accessToken);
                setToken(accessToken);
                console.log("access token dentro de categorias -> " + token);
            } catch (error) {
                console.error("Error al obtener la sesión del usuario", error);
            }
        };
        checkUserSession();
    }, []);

    //guardar los datos de la categoría
    const [nombre, setNombre] = useState('');
    const [activo, setActivo] = useState(false);
    const handleInputChange = (event) => {
        setNombre(event.target.value);
    };
    const handleSwitchChange = (event) => {
        setActivo(event.target.checked);
    };
    //crear categoria
    const handleAceptarClick = async () => {
        const userData = {
            name: nombre,
            active: activo,
        };
        console.log(userData);
        try {
            const response = await authController.createCategory(userData, token);
            console.log('Respuesta de la creación de categoría:', response);
        } catch (error) {
            console.error('Error al crear la categoría:', error);
        }
    };

    return (
        <div className='crear-categorias'>
            <div className='crear-categoria-mask'>
                <h3>Crear categoría</h3>
                <TextField 
                    id="outlined-basic" 
                    label="nombre" 
                    variant="outlined" 
                    value={nombre}
                    onChange={handleInputChange}
                />
                <label>Activo:</label>
                <Switch 
                    {...label}
                    checked={activo} 
                    onChange={handleSwitchChange}    
                />
                <Button variant="contained" onClick={handleAceptarClick} className='btn-add'>Aceptar</Button>
            </div>
        </div>
    )
}
