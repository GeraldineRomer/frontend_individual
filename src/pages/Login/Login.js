import React from 'react';
import './Login.scss';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Footer } from '../../components/Footer/Footer';
import { Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const register = () => {
        console.log('Di click en login');
        window.location.href = '/register';
        /* window.open('../Register','_self') */
    }
    return (
        <div className='login'>
            <div className='login-mask'>
                <div>
                    <label className='login-label'>Iniciar Sesión</label>
                </div>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className='info'>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email" className='input-label'>Email</InputLabel>
                            <OutlinedInput
                                required
                                id="outlined-adornment-email"
                                type='email'
                                className='input'
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle email visibility"
                                            edge="end"
                                        >
                                        <AccountCircleIcon className='icon'/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Email"
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" className='input-label'>Contraseña</InputLabel>
                            <OutlinedInput
                                required
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                className='input'
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
                <div className='forgot-password'>
                    <a href='#'>¿Olvidaste tu contraseña?</a>
                </div>
                <div className='btn-div-login'>
                    <Button variant="contained" className='btn-login'>Iniciar Sesión</Button>
                </div>
                <div className='registro'>
                    <label>¿No tienes una cuenta?</label>
                    <a onClick={register}>Regístrate</a>
                </div>
            </div>
            {/* <Footer className='Footer'/> */}
        </div>
    )
}

