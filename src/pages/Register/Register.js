import React, { useEffect, useState } from 'react';
import './Register.scss';
import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Auth } from '../../api';
import axios from "axios";
import { useAuth } from '../../hooks';

export const Register = () => {
    const authController = new Auth();
    
    const [munDep, setMunDep] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState(null);
    const [municipiosFiltrados, setMunicipiosFiltrados] = useState([]);
    
    const [isColombiaSelected, setIsColombiaSelected] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(
                "https://www.datos.gov.co/resource/xdk5-pm3f.json"
                );
            setMunDep(response.data);
            const uniqueDepartamentos = [
                ...new Set(response.data.map((item) => item.departamento)),
            ];
            setDepartamentos(uniqueDepartamentos);
        } catch (error) {
            console.error("Error al hacer la solicitud:", error);
        }
        };
        fetchData();
    }, []);

    const handleDepartamentoChange = (event, value) => {
        setSelectedDepartamento(value);
        const municipios = munDep
        .filter((item) => item.departamento === value)
        .map((item) => item.municipio);

        setMunicipiosFiltrados(municipios);
        console.log(value);
    };

    const { signup } = useAuth();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        document: "",
        documentType: "",
        country: "",
        departamento: "",
        municipality: "",
    });

    const [error, setError] = useState("");

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
        ...prevData,
        [field]: value,
        }));
        setIsColombiaSelected(typeof value === 'string' && value.toLowerCase() === 'colombia');
    };

    const onFinish = async () => {
        console.log("Received values of form: ", formData);
        try {
            setError("");
            const response = await authController.register(formData);
            authController.setAccessToken(response.access);
            signup(response);
            window.location.href = "/admin/";
            console.log(response);
        } catch (error) {
            setError("Error en el servidor con validación de formato de evolución");
        }
    };

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

    const privacy = () => {
        window.location.href = '/privacy';
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
                        onChange={(e) => handleInputChange("firstname", e.target.value)}
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="Apellido"
                        className='input'
                        onChange={(e) => handleInputChange("lastname", e.target.value)}
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="País"
                        className='input' 
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        />
                        <Autocomplete
                        required
                        id="outlined-select-currency"
                        select
                        label="Departamento"
                        className='input'
                        options={departamentos}
                        value={selectedDepartamento}
                        onChange={(e, value) => {
                            handleDepartamentoChange(e, value);
                            handleInputChange("departamento", value);
                        }}
                        disabled={formData.country !== "Colombia"}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Departamento"
                            />
                        )}
                        //helperText="Please select your currency"
                        >
                        </Autocomplete>
                        <Autocomplete
                        required
                        id="outlined-select-currency"
                        disablePortal
                        label="Municipio"
                        //defaultValue="Manizales"
                        options={municipiosFiltrados}
                        className='input'
                        onChange={(e, value) => handleInputChange("municipality", value)}
                        disabled={formData.country !== "Colombia"}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Municipio"
                            />
                        )}
                        //helperText="Please select your currency"
                        >
                        </Autocomplete>
                        <TextField
                        required
                        id="outlined-select-currency"
                        select
                        label="Tipo de documento"
                        defaultValue="CC"
                        className='input'
                        onChange={(e, value) => handleInputChange("documentType", value)}
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
                        onChange={(e) => handleInputChange("document", e.target.value)}
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        className='input'
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" className='input-label'>Contraseña*</InputLabel>
                            <OutlinedInput
                                required
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                className='input-password'
                                onChange={(e) => handleInputChange("password", e.target.value)}
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
                <FormGroup className='form'>
                    <FormControlLabel required control={<Checkbox  className='icon'/>} label="Acepto" className='checkbox'/>
                    <a onClick={privacy}>Términos y Condiciones</a>
                </FormGroup>
                <div className='login-register'>
                    <label>¿Ya tienes una cuenta?</label>
                    <a onClick={login} href='#'>Iniciar Sesión</a>
                </div>
                <div className='div-btn-register'>
                    <Button variant="contained" className='btn-register' onClick={onFinish}>Registrar</Button>
                </div>
            </div>
        </div>
    )
}
