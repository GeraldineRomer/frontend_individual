import React from 'react';
import './ChangePassword.scss';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { Button } from 'antd';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const ChangePassword = () => {
    //contraseña actual
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    //contraseña nueva
    const [showNewPassword, setShowNewPassword] = React.useState(false);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleMouseDownNewPassword = (event) => {
        event.preventDefault();
    };
    //validaciones de que los campos sean llenos y escritos correctamente
    const [error, setError] = React.useState('');
    const validationSchema = Yup.object().shape({
        password: Yup.string().required('La contraseña es requerida'),
        newPassword: Yup.string().required('La contraseña es requerida'),
    });
    const formik = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setError('');
                /* const response = await authController.login(values);
                if (response.active === false) {
                    window.location.href = '/noVerify';
                }
                authController.setAccessToken(response.access);
                login(response);
                console.log(response); */
            } catch (error) {
                setError('Error en el servidor con validación de formato de evolución');
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className='change-password'>
            <div className='change-password-mask'>
                <label className='change-password-label'>Cambiar Contraseña</label>
                <div className='info-password'>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={formik.touched.password && Boolean(formik.errors.password)}>
                        <InputLabel htmlFor="outlined-adornment-password" className='input-label-change-password'>Contraseña actual</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            className='input-change-password'
                            {...formik.getFieldProps('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff className='icon-change-password'/> : <Visibility className='icon-change-password'/>}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                            
                        />
                        {formik.touched.password && formik.errors.password ? (
                                <FormHelperText>{formik.errors.password}</FormHelperText>
                        ) : null}
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}>
                        <InputLabel htmlFor="outlined-adornment-new-password" className='input-label-change-password'>Contraseña nueva</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showNewPassword ? 'text' : 'password'}
                            className='input-change-password'
                            {...formik.getFieldProps('newPassword')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowNewPassword}
                                onMouseDown={handleMouseDownNewPassword}
                                edge="end"
                                >
                                {showNewPassword ? <VisibilityOff className='icon-change-password'/> : <Visibility className='icon-change-password'/>}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                        {formik.touched.newPassword && formik.errors.newPassword ? (
                            <FormHelperText>{formik.errors.newPassword}</FormHelperText>
                        ) : null}
                    </FormControl>
                </div>
                <Button variant="contained" className='btn-aceptar-change-password' type='submit'>Aceptar</Button>
            </div>
        </form>
    )
}

