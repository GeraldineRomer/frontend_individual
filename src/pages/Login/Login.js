import React, { useContext, useEffect } from 'react';
import './Login.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Auth } from '../../api';
import { useAuth } from '../../hooks';
import { AuthContext } from '../../context';

const authController = new Auth();

export const Login = () => {
    const { user } = useContext(AuthContext);
    const { login } = useAuth();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Ingrese un correo electrónico válido').required('El correo electrónico es requerido'),
        password: Yup.string().required('La contraseña es requerida'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setError('');
                const response = await authController.login(values);

                // Verificar si el correo no se encuentra en la base de datos
                if (response && response.error && response.error.emailNotFound) {
                    setError('El correo electrónico no está registrado');
                    return; // Detener la ejecución
                }
                // Verificar si la contraseña es incorrecta
                if (response && response.error && response.error.invalidPassword) {
                    setError('La contraseña es incorrecta');
                    return; // Detener la ejecución
                }
                
                if (response.active === false) {
                    window.location.href = '/noVerify';
                }
                authController.setAccessToken(response.access);
                login(response);
                console.log(response);
            } catch (error) {
                setError('Error en el servidor con validación de formato de evolución');
            }
        },
    });

    const [error, setError] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    useEffect(() => {
        if (user && user.role === 'admin') {
            window.location.href = '/admin';
        } else if (user && user.role === 'guess' && user.active === true) {
            window.location.href = '/user';
        }
    }, [user]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const register = () => {
        console.log('Di click en login');
        window.location.href = '/register';
    };

    return (
        <form onSubmit={formik.handleSubmit} className='login'>
            <div className='login-mask'>
                <div>
                    <label className='login-label'>Iniciar Sesión</label>
                </div>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div className='info'>
                        <FormControl variant='outlined' error={formik.touched.email && Boolean(formik.errors.email)}>
                            <InputLabel htmlFor='outlined-adornment-email' className='input-label'>Email</InputLabel>
                            <OutlinedInput
                                required
                                id='outlined-adornment-email'
                                type='email'
                                className='input'
                                {...formik.getFieldProps('email')}
                                label='Email'
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
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <FormHelperText>{formik.errors.email}</FormHelperText>
                            ) : null}
                        </FormControl>
                        <FormControl variant='outlined' error={formik.touched.password && Boolean(formik.errors.password)}>
                            <InputLabel htmlFor='outlined-adornment-password' className='input-label'>Contraseña</InputLabel>
                            <OutlinedInput
                                required
                                id='outlined-adornment-password'
                                type={showPassword ? 'text' : 'password'}
                                className='input'
                                {...formik.getFieldProps('password')}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            aria-label='toggle password visibility'
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge='end'
                                        >
                                            {showPassword ? <VisibilityOff className='icon' /> : <Visibility className='icon' />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label='Password'
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <FormHelperText>{formik.errors.password}</FormHelperText>
                            ) : null}
                        </FormControl>
                    </div>
                </Box>
                <div className='forgot-password'>
                    <a href='#'>¿Olvidaste tu contraseña?</a>
                </div>
                <div className='btn-div-login'>
                    <Button variant='contained' className='btn-login' type='submit'>Iniciar Sesión</Button>
                </div>
                <div className='registro'>
                    <label>¿No tienes una cuenta?</label>
                    <a onClick={register}>Regístrate</a>
                </div>
            </div>
        </form>
    );
};

