import React, { useEffect, useState } from 'react';
import './Register.scss';
import { Autocomplete, Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Auth } from '../../api';
import axios from "axios";
import { useAuth } from '../../hooks';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';

export const Register = () => {
    const authController = new Auth();

    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('');
    
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
        password: Yup.string().required('La contraseña es requerida').
                    matches(/^(?=.[a-z])(?=.[A-Z])(?=.*\d).{8,}$/,
                            "Contraseña: 1 mayúscula, 1 minúscula, 1 número, mínimo 8 caracteres."),
        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
                            .required('Debes confirmar la contraseña'),
        document: Yup.string().required('El documento es requerido').matches(/^[0-9]+$/, "El número de documento debe contener solo números"),
        document_type: Yup.string().required('El tipo de documento es requerido').
                        oneOf(
                        [
                        "Cédula",
                        "Cédula Extranjera",
                        "Tarjeta Identidad",
                        "Registro Civil",
                        ],
                        "Tipo de documento inválido"
                    ),
        country: Yup.string().required('El país es requerido'),
        department: isColombiaSelected ? Yup.string().required('El departamento es requerido') : Yup.string(),
        municipality: isColombiaSelected ? Yup.string().required('El municipio es requerido') : Yup.string(),
        acceptTerms: Yup.boolean().oneOf([true], 'Debes aceptar los términos y condiciones para registrarte').required(),
    });

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

    const [error, setError] = useState("");

    const onFinish = async (values) => {
        console.log("Received values of form: ", values);
        try {
            setError("");
            const response = await authController.register(values);
            console.log("Soy response" + response);
            //window.location.href = '/verify';
            authController.setAccessToken(response.access);
            console.log("Soy response" + response);
            signup(response);
            console.log("Soy response" + response);
        } catch (error) {
            console.error("Error en onFinish:", error);
            setError("Error en el servidor con validación de formato de evolución");
        }
    };

    //proceso de finalizar el registro del formulario
    const initialValues = {
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
    }
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
        onSubmit: async (values, { setSubmitting }) => {
            try {
                // Ejecutar las validaciones de formik
                //await validationSchema.validate(values, { abortEarly: false });
    
                // Si las validaciones son exitosas, ejecutar la lógica de onFinish
                console.log("Received values of form:", values);
                setError("");
    
                const response = await authController.register(values);
                window.location.href = '/verify';
                authController.setAccessToken(response.access);
                signup(response);
            } catch (error) {
                // Si hay errores de validación o de registro, establecer el error
                console.error("Error en onSubmit:", error);
                if (error.name === 'ValidationError') {
                    const errors = {};
                    error.inner.forEach((e) => {
                        errors[e.path] = e.message;
                    });
                    formik.setErrors(errors);
                } else {
                    setError("Error en el servidor al procesar el registro");
                }
            } finally {
                setSubmitting(false);
            }
        },
    });    

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
        <div className='register'>

        
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onFinish}
        
        >
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
                        <Grid container spacing={2}>
                            <div className='info'>
                            <Grid item xs={12} md={6} className='col'>
                                <TextField
                                    required
                                    id="outlined-required-firstname"
                                    label="Nombre"
                                    className='input'
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        console.log(`campo register -> : ${formik.values}`);
                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstname}
                                    onFocus={() => console.log("Valor actual de firstname:", formik.values.firstname)}
                                    name="firstname"
                                />
                                {formik.touched.firstname && formik.errors.firstname ? (
                                    <div className='error-below'>{formik.errors.firstname}</div>
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
                                        const newValueLabel = newValue ? newValue.label : '';
                                        formik.setFieldValue('country', newValueLabel);
                                        console.log(`Value of 'country' field set to: ${newValueLabel}`);
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
                                id='municipio'
                                disablePortal
                                label="Municipio"
                                options={municipiosFiltrados}
                                className='input'
                                onChange={(e, value) => formik.setFieldValue("municipality", value)}
                                onBlur={formik.handleBlur}
                                disabled={formik.values.country !== "Colombia"}
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
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password" className='input-label'>Contraseña</InputLabel>
                                    <OutlinedInput
                                        required
                                        id="outlined-adornment-verify-password"
                                        type={showPassword ? 'text' : 'Password'}
                                        className='input-password'
                                        onChange={(e) => {
                                            formik.handleChange(e); // Actualiza el valor en formik
                                            setPasswordValue(e.target.value); // Actualiza el estado local
                                        }} 
                                        onBlur={formik.handleBlur}
                                        value={passwordValue} // Usa el estado local para el valor
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
                                        name="password"
                                    />
                                </FormControl>
                                {formik.touched.password && formik.errors.password ? (
                                    <div className='error-below'>{formik.errors.password}</div>
                                ) : null}
                            </Grid>
                            <Grid item xs={12} md={6} className='col'>
                                <TextField
                                    required
                                    id="outlined-required-lastname"
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
                                id="outlined-select-currency-department"
                                label="Departamento"
                                className='input'
                                options={departamentos}
                                value={selectedDepartamento}
                                onChange={(e, value) => {
                                    handleDepartamentoChange(e, value);
                                    formik.setFieldValue("department", value);
                                }}
                                onBlur={formik.handleBlur}
                                disabled={formik.values.country !== "Colombia"}
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
                                    id="outlined-select-currency-document-type"
                                    options={documentTypes}
                                    getOptionLabel={(option) => option.label}
                                    className='input'
                                    onChange={(e, value) => {
                                        console.log("Valor seleccionado:", value); // Verifica el valor seleccionado
                                        if (value) {
                                            console.log("Valor seleccionado (label):", value.label); // Si el valor tiene una propiedad 'label'
                                            formik.setFieldValue("document_type", value.label);
                                        }
                                    }}
                                    onBlur={formik.handleBlur}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tipo de documento"
                                        />
                                    )}
                                />
                                {formik.touched.document_type && formik.errors.document_type ? (
                                    <div className='error-below'>{formik.errors.document_type}</div>
                                ) : null}
                                <TextField
                                required
                                id="outlined-required-email"
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
                                    <InputLabel htmlFor="outlined-adornment-password" className='input-label'>Verificar Contraseña*</InputLabel>
                                    <OutlinedInput
                                        required
                                        id="outlined-adornment-password"
                                        type={showVerifyPassword ? 'text' : 'Password'}
                                        className='input-password'
                                        onChange={(e) => {
                                            formik.handleChange(e); // Actualiza el valor en formik
                                            setConfirmPasswordValue(e.target.value); // Actualiza el estado local
                                        }}
                                        onBlur={formik.handleBlur}
                                        value={confirmPasswordValue} // Usa el estado local para el valor
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
                                        label="VerifyPassword"
                                        name="confirmPassword"
                                    />
                                </FormControl>
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className='error-below'>{formik.errors.confirmPassword}</div>
                                ) : null}
                            </Grid>
                            </div>
                        </Grid>
                    </Box>
                    <FormGroup className='form'>
                        <FormControlLabel 
                        required 
                        control= 
                            {<Checkbox  
                                className='icon' 
                                checked={formik.values.acceptTerms} 
                                onChange={(e) => {
                                    formik.handleChange(e); // Actualiza el valor en formik
                                    setIsTermsAccepted(e.target.checked); // Actualiza el estado local
                                }}
                            />} 
                        label="Acepto" 
                        className='checkbox'
                        name="acceptTerms"
                        />
                        {formik.errors.acceptTerms && formik.touched.acceptTerms ? (
                            <FormHelperText style={{ color: 'red', marginTop: '0.5rem' }}>
                                {formik.errors.acceptTerms}
                            </FormHelperText>
                        ) : null}
                        <a onClick={privacy}>Términos y Condiciones</a>
                    </FormGroup>
                <div className='login-register'>
                    <label>¿Ya tienes una cuenta?</label>
                    <a onClick={login} href='#'>Iniciar Sesión</a>
                </div>
                <div className='div-btn-register'>
                    <Button 
                        variant="contained" 
                        className='btn-register' 
                        type="submit"
                        onClick={(event) => {
                            //event.preventDefault(); // Si estás manejando un formulario, puedes prevenir el comportamiento predeterminado del botón submit
                            console.log("Values al hacer clic:", formik.values);
                            onFinish(formik.values);
                            // Aquí puedes agregar cualquier otra lógica que necesites al hacer clic en el botón
                        }}
                    >
                        Registrar
                    </Button>
                </div>
            </div>
        </Formik>
        </div>
    )
}
