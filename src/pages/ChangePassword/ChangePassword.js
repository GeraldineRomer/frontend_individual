import React, { useEffect, useState } from 'react';
import './ChangePassword.scss';
import { Alert, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Button } from 'antd';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User } from '../../api/user'; 
import { Auth } from '../../api/auth'; 
import { changePassword } from '../../api/user';

const authController = new Auth();

export const ChangePassword = () => {
    //contraseña actual mostrar en texto o contraseña
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    //contraseña nueva mostrar en texto o contraseña
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
    //verificar que la contraseña escrita coincida con la contraseña en base de datos
    const [token,setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const checkUserSession = async () => {
            try {
                //obtener el usuario
                const userApi = new User();
                const accessToken = await authController.getAccessToken();
                console.log("access token dentro de Users -> " + accessToken);
                setToken(accessToken);
                console.log("set access token -> ", token);
                const userInfo = await userApi.getMeId(accessToken);
                console.log("Datos completos del usuario: ", userInfo);
                setUserData(userInfo);
            } catch (error) {
                console.error("Error al obtener la sesión del usuario", error);
            }
        };
        checkUserSession();
    }, []);
    //alertas por si hubo un error o se cambió la contraseña correctamente
    const [alert, setAlert] = useState({ type: '', message: '' });
    const handleSubmitVerifyPassword = async (values) => {
        try {
            setError('');
            const passwordDB = userData.password;
            console.log("contraseña de base de datos -> ", passwordDB);
            const userId = userData._id;
            console.log("id usuario verify -> ", userId);
            // Verificar si la contraseña actual coincide con la almacenada en la base de datos
            const isCurrentPasswordValid = await authController.verifyCurrentPassword(values.password, userId);
            console.log("isCurrentPasswordValid -> ", isCurrentPasswordValid);
            if (isCurrentPasswordValid) {
                console.log('La contraseña actual es válida');
                const newPassword = values.newPassword;
                console.log('Nueva contraseña ->', newPassword);
                const res = await changePassword(userId, newPassword, token);
                console.log("res de changePassword ", res);
                if (res.status === 200){
                    console.log('Contraseña actualizada con éxito');
                    setAlert({ type: 'success', message: 'Código verificado con éxito' });
                    await authController.logout();
                    window.location.href = '/login';
                }
            } else {
                console.log("Contraseña actual incorrecta");
                setAlert({ type: 'error', message: 'Contraseña actual incorrecta' });
                setError('La contraseña actual es incorrecta');
            }
        } catch (error) {
            setError('Error en el servidor con validación de formato de evolución');
            console.error('Error al verificar la contraseña actual:', error);
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} className='change-password'>
            {alert.type === 'success' && (
                <Alert variant="outlined" severity="success" className='alert'>
                    {alert.message}
                </Alert>
            )}
            {alert.type === 'error' && (
                <Alert variant="outlined" severity="error" className='alert'>
                    {alert.message}
                </Alert>
            )}
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
                <Button 
                    variant="contained" 
                    className='btn-aceptar-change-password' 
                    
                    onClick={() => handleSubmitVerifyPassword(formik.values)}
                >
                    Aceptar
                </Button>
            </div>
        </form>
    )
}

