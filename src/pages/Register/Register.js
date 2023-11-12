import React from 'react';
import './Register.scss';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Register = () => {
    const currencies = [
        {
            value: 'TI',
            label: 'Tarjeta Identidad',
        },
        {
            value: 'CC',
            label: 'Cédula',
        },
        {
            value: 'CE',
            label: 'Cédula Extranjera',
        },
        {
            value: 'RC',
            label: 'Registro Civil',
        },
    ];
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const login = () => {
        console.log('Di click en login');
        window.location.href = '/login';
        /* window.open('../Login','_self') */
    }
    return (
        <div className='register'>
            <div className='register-mask'>
                <div>
                    <label className='register-label'>Registro</label>
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
                        id="outlined-required"
                        label="Nombre"
                        className='input'
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="Apellido"
                        className='input'
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="País"
                        className='input'
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="Departamento"
                        className='input'
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="Municipio"
                        className='input'
                        />
                        <TextField
                        required
                        id="outlined-select-currency"
                        select
                        label="Tipo de documento"
                        defaultValue="CC"
                        className='input'
                        //helperText="Please select your currency"
                        >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value} className='dropdown'>
                                {option.label}
                            </MenuItem>
                        ))}
                        </TextField>
                        <TextField
                        required
                        id="outlined-number"
                        label="Documento"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className='input'
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        className='input'
                        />
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" className='input-label'>Contraseña*</InputLabel>
                            <OutlinedInput
                                required
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                className='input-password'
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff className='icon'/> : <Visibility className='icon'/>}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" className='input-label'>Verificar Contraseña*</InputLabel>
                            <OutlinedInput
                                required
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                className='input-password'
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff className='icon'/> : <Visibility className='icon'/>}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </div>
                </Box>
                <div className='login-register'>
                    <label>Ya tienes una cuenta?</label>
                    <a onClick={login} href='#'>Iniciar Sesión</a>
                </div>
                <div className='div-btn-register'>
                    <Button variant="contained" className='btn-register'>Registrar</Button>
                </div>
            </div>
        </div>
    )
}
