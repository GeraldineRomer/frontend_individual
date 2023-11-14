import React from 'react';
import './NoVerify.scss';
import { Button } from '@mui/material';

export const NoVerify = () => {
    return (
        <div className="no-verify">
            <h1 className="no-verify__title">¡Tenemos problemas!</h1>
            <h3 className="no-verify__title">No has verificado tu cuenta</h3>
            <h3 className="no-verify__title">Recuerda revisar tu email o tus mensajes de texto</h3>
            <Button variant="contained" className='btn-noverify'>Aceptar</Button>
        </div>
    )
}
