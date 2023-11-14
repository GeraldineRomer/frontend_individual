import React, { useState } from 'react';
import './Verify.scss';
import {  Alert, Button, TextField } from '@mui/material';
import axios from 'axios';
import { Auth } from '../../api';

export const Verify = () => {
    const authController = new Auth();
    const [code, setCode] = useState('');
    const [alert, setAlert] = useState({ type: '', message: '' });

    const [formData, setFormData] = useState({verifyCode: ""});

    const handleVerification = async () => {
        try {
            const response = await authController.verifyCode({ verificationCode: code });
            console.log("code -> " + code);
            console.log(response); 
        
            if (response.success) {
                setAlert({ type: 'success', message: 'Código verificado con éxito' });
                window.location.href = '/login'
            } else {
                setAlert({ type: 'error', message: 'Código incorrecto' });
            }
        } catch (error) {
            console.error('Error al verificar el código:', error);
            setAlert({ type: 'error', message: 'Error al verificar el código' });
        }
    };

    return (
        <div className='verify'>
            {/* Renderiza la alerta según el estado */}
            {alert.type === 'success' && (
                <Alert variant="outlined" severity="success">
                    {alert.message}
                </Alert>
            )}
            {alert.type === 'error' && (
                <Alert variant="outlined" severity="error">
                    {alert.message}
                </Alert>
            )}
            <h1 className="verify-title">Recuerda revisar tu email o mensajes de texto para verificar tu cuenta</h1>
            <h3 className="verify-title">Ingresa el código de verificación</h3>
            <TextField 
            id="outlined-basic" 
            label="Código Verificación" 
            variant="outlined" 
            className='input-verify'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            />
            <Button variant="contained" className='btn-verify' onClick={handleVerification}>Verificar</Button>
        </div>
    )
}
