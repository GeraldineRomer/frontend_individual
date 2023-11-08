import React from 'react';
import './Login.scss';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Footer } from '../../components/Footer/Footer';
import { Button } from '@mui/material';

export const Login = () => {
    return (
        <div className='login'>
            <div className='login-mask'>
                <div>
                    <label className='login-label'>Inicio Sesión</label>
                </div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div className='info'>
                        <TextField
                        required
                        id="outlined-password-input"
                        label="Correo"
                        autoComplete=""
                        className='input'
                        />
                        <TextField
                        required
                        id="outlined-password-input"
                        label="Contraseña"
                        type="password"
                        autoComplete="current-password"
                        className='input'
                        />
                    </div>
                </Box>
                <div className='btn-div-login'>
                    <Button variant="outlined" className='btn-login'>Iniciar Sesión</Button>
                </div>
                <div className='forgot-password'>
                    <a href='#'>¿Olvidaste tu contraseña?</a>
                </div>
            </div>
            <Footer className='Footer'/>
        </div>
    )
}

