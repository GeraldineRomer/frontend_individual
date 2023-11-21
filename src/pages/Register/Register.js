import React, { useEffect, useState } from 'react';
import './Register.scss';
import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Auth } from '../../api';
import axios from "axios";
import { useAuth } from '../../hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Register = () => {
    const authController = new Auth();
    
    //selección de departamentos y municipios
    const [munDep, setMunDep] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);
    const [selectedDepartamento, setSelectedDepartamento] = useState(null);
    const [municipiosFiltrados, setMunicipiosFiltrados] = useState([]);
    
    const [isColombiaSelected, setIsColombiaSelected] = useState(true);

    //términos aceptados
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    //selección del país
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    //api sobre departamentos o municipios
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

    //api de países
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const countriesData = response.data.map((country) => ({
                value: country.cca2,
                label: country.name.common,
                }));
                setCountries(countriesData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
    
        fetchCountries();
    }, []);

    //validaciones con formik y yup
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('El nombre es requerido'),
        lastname: Yup.string().required('El apellido es requerido'),
        email: Yup.string().email('El correo electrónico no es válido').required('El correo electrónico es requerido')
            .matches(/@(gmail|outlook)\.com$/, 'El correo debe ser de Gmail o Outlook'),
        password: Yup.string().required('La contraseña es requerida'),
        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
                            .required('Debes confirmar la contraseña'),
        document: Yup.string().required('El documento es requerido'),
        document_type: Yup.string().required('El tipo de documento es requerido'),
        country: Yup.string().required('El país es requerido'),
        department: isColombiaSelected ? Yup.string().required('El departamento es requerido') : Yup.string(),
        municipality: isColombiaSelected ? Yup.string().required('El municipio es requerido') : Yup.string(),
        acceptTerms: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones para registrarte').required(),
    });

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
    };
    

    //elegir el municipio a partir del departamento
    const handleDepartamentoChange = (event, value) => {
        setSelectedDepartamento(value);
        const municipios = munDep
        .filter((item) => item.departamento === value)
        .map((item) => item.municipio);

        setMunicipiosFiltrados(municipios);
    };

    //iniciar sesión
    const { signup } = useAuth();

    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        document: "",
        document_type: "",
        country: "",
        department: "",
        municipality: "",
        acceptTerms: false,
    });

    const [error, setError] = useState("");

    //extraer datos del formulario
    const handleInputChange = (field, value) => {
        let processedValue = value;
        // Si el campo es "document_type" y el valor es un objeto, extraer el campo "label"
        if (field === "document_type" && typeof value === "object" && value !== null) {
            processedValue = value.label;
        }

        if (field === "acceptTerms") {
            processedValue = value.target.checked;
            setIsTermsAccepted(processedValue);
        }
        console.log("processedValue : " + processedValue);
        console.log("isTermsAccepted:", isTermsAccepted);

        setFormData((prevData) => ({
        ...prevData,
        [field]: processedValue,
        }));
        setIsColombiaSelected(typeof value === 'string' && value.toLowerCase() === 'colombia');
    };

    //proceso de finalizar el registro del formulario
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            document: '',
            document_type: '',
            country: '',
            department: '',
            municipality: '',
            acceptTerms: false,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log('Formulario enviado con éxito:', values);
            // Realiza las acciones correspondientes, como enviar los datos a la API
            try {
                setError("");
                const response = await authController.register(values);
                window.location.href = '/verify';
                authController.setAccessToken(response.access);
                signup(response);
            } catch (error) {
                console.error("Error en onSubmit:", error);
                setError("Error en el servidor con validación de formato de evolución");
            }
        },
    });
    /*  const onFinish = async () => {
        console.log("Received values of form: ", formData);
        //aceptar términos y condiciones
        if (!isTermsAccepted) {
            setError("Debes aceptar los términos y condiciones para registrarte.");
            return;
        }
        try {
            setError("");
            const response = await authController.register(formData);
            console.log("Soy response" + response);
            window.location.href = '/verify';
            authController.setAccessToken(response.access);
            console.log("Soy response" + response);
            signup(response);
            console.log("Soy response" + response);
        } catch (error) {
            console.error("Error en onFinish:", error);
            setError("Error en el servidor con validación de formato de evolución");
        }
    }; */

    //campos de tipo de documento
    const documentTypes = [
        { label: "Cédula" },
        { label: "Cédula Extranjera" },
        { label: "Tarjeta Identidad" },
        { label: "Registro Civil" },
    ];
    
    //mostrar ícono de ver o no contraseña en campo de contraseña y verificación de contraseñas
    const [showPassword, setShowPassword] = React.useState(false);
    const [showVerifyPassword, setShowVerifyPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowVerifyPassword = () => setShowVerifyPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    //ya tiene una cuenta creada
    const login = () => {
        console.log('Di click en login');
        window.location.href = '/login';
        /* window.open('../Login','_self') */
    }

    //ver términos y condiciones
    const privacy = () => {
        window.location.href = '/privacy';
    }

    return (
        <form onSubmit={formik.handleSubmit} className='register'>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstname}
                                name="firstname"
                            />
                            {formik.touched.firstname && formik.errors.firstname ? (
                                <div className='error-below'>{formik.errors.firstname}</div>
                            ) : null}
                            <TextField
                                required
                                id="outlined-required"
                                label="Apellido"
                                className='input'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastname}
                                name="lastname"
                            />
                            {formik.touched.lastname && formik.errors.lastname ? (
                                <div className='error-below'>{formik.errors.lastname}</div>
                            ) : null}
                            <Autocomplete
                                required
                                id="country-autocomplete"
                                className='input'
                                options={countries}
                                getOptionLabel={(option) => option.label}
                                value={selectedCountry}
                                onChange={(event, newValue) => {
                                    setSelectedCountry(newValue);
                                    formik.setFieldValue('country', newValue ? newValue.label : '');
                                }}
                                onBlur={formik.handleBlur}
                                renderInput={(params) => (
                                    <TextField {...params} label="País" />
                                )}
                                name="country"
                            />
                            {formik.touched.country && formik.errors.country ? (
                                <div className='error-below'>{formik.errors.country}</div>
                            ) : null}
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
                                formik.setFieldValue("department", value);
                            }}
                            onBlur={formik.handleBlur}
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
                            {formik.touched.department && formik.errors.department ? (
                                <div className='error-below'>{formik.errors.department}</div>
                            ) : null}
                            <Autocomplete
                            required
                            disablePortal
                            label="Municipio"
                            options={municipiosFiltrados}
                            className='input'
                            onChange={(e, value) => formik.setFieldValue("municipality", value)}
                            onBlur={formik.handleBlur}
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
                            {formik.touched.municipality && formik.errors.municipality ? (
                                <div className='error-below'>{formik.errors.municipality}</div>
                            ) : null}
                            <Autocomplete
                            required
                            disablePortal
                            id="outlined-select-currency"
                            label="Tipo de documento"
                            options={documentTypes}
                            className='input'
                            onChange={(e, value) => formik.setFieldValue("document_type", value)}
                            onBlur={formik.handleBlur}
                            //helperText="Please select your currency"
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                label="Tipo de documento"
                                />
                            )}
                            >
                            </Autocomplete>
                            {formik.touched.document_type && formik.errors.document_type ? (
                                <div className='error-below'>{formik.errors.document_type}</div>
                            ) : null}
                            <TextField
                            required
                            id="outlined-number"
                            label="Documento"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className='input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.document}
                            name="document"
                            />
                            {formik.touched.document && formik.errors.document ? (
                                <div className='error-below'>{formik.errors.document}</div>
                            ) : null}
                            <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            className='input'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            name="email"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className='error-below'>{formik.errors.email}</div>
                            ) : null}
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password" className='input-label'>Contraseña*</InputLabel>
                                <OutlinedInput
                                    required
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    className='input-password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
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
                            {formik.touched.password && formik.errors.password ? (
                                <div className='error-below'>{formik.errors.password}</div>
                            ) : null}
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password" className='input-label'>Verificar Contraseña*</InputLabel>
                                <OutlinedInput
                                    required
                                    id="outlined-adornment-password"
                                    type={showVerifyPassword ? 'text' : 'password'}
                                    className='input-password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowVerifyPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {showVerifyPassword ? <VisibilityOff className='icon'/> : <Visibility className='icon'/>}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className='error-below'>{formik.errors.confirmPassword}</div>
                            ) : null}
                        </div>
                    </Box>
                    <FormGroup className='form'>
                        <FormControlLabel 
                        required 
                        control= 
                            {<Checkbox  
                                className='icon' 
                                checked={isTermsAccepted} 
                                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                            />} 
                        label="Acepto" 
                        className='checkbox'
                        />
                        {error && <FormHelperText style={{ color: 'red', marginTop: '0.5rem' }}>{error}</FormHelperText>}
                        <a onClick={privacy}>Términos y Condiciones</a>
                    </FormGroup>
                <div className='login-register'>
                    <label>¿Ya tienes una cuenta?</label>
                    <a onClick={login} href='#'>Iniciar Sesión</a>
                </div>
                <div className='div-btn-register'>
                    <Button variant="contained" className='btn-register' type="submit">Registrar</Button>
                </div>
            </div>
        </form>
    )
}
