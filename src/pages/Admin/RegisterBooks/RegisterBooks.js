import React, { useEffect, useState } from 'react';
import './RegisterBooks.scss';
import { Autocomplete, Button, TextField, Input, IconButton, styled, FormHelperText, } from '@mui/material';
import { Auth } from '../../../api/auth'; 
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik/dist';

const InputFile = styled('input')({
    display: 'none',
});

const authController = new Auth();

export const RegisterBooks = () => {
    //hooks para manejar los campos del formulario
    const [categoryId, setCategoryId] = useState('');
    //obtener token
    const [token,setToken] = useState(null);
    //filtrar categorias
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const accessToken = await authController.getAccessToken();
                setToken(accessToken);
                console.log("access token dentro de libros -> " + token);
                //obtener categorias
                const categoriesData = await authController.getCategories(accessToken);
                setCategories(categoriesData);
                console.log("categorias -> " + categoriesData);
            } catch (error) {
                console.error("Error al obtener la sesión del usuario", error);
            }
        };
        checkUserSession();
    }, []);
    //campo para subir archivos tipo file
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };
    //crear libro
    const bookSchema = Yup.object().shape({
        title: Yup.string().required('El título es requerido'),
        author: Yup.string().required('El autor es requerido'),
        price: Yup.number().required('El precio es requerido').positive('El precio debe ser mayor que cero'),
        description: Yup.string().max(2000, 'La descripción no puede tener más de 500 caracteres'),
        category: Yup.string().required('La categoría es requerida'),
    });

    const initialValues = {
            title: '',
            author: '',
            price: 0,
            description: '',
            category: '',
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            price: 0,
            description: '',
            category: '',
        },
        validationSchema: bookSchema,
        onSubmit: (values, { resetForm }) => {
          // Realiza acciones cuando el formulario sea válido
            console.log("entre al handle formik");
            handleFileUpload().then(() => {
                resetForm(); // Reinicia los valores del formulario después de enviar los datos
            }).catch(error => {
                console.error('Error al manejar el archivo:', error);
            });
        },
    });
    const [formValues, setFormValues] = useState({
        title: '',
        author: '',
        price: 0,
        description: '',
        category: '',
    });
    
    const handleFileUpload = async () => {
        console.log("category -> ", categoryId);
        const bookData = {
            title: formik.values.title,
            author: formik.values.author,
            price: formik.values.price,
            description: formik.values.description,
            category: categoryId,
            images: selectedFile,
        };
        console.log("formData -> ", bookData);
        if (selectedFile) {
            console.log('Archivo seleccionado:', selectedFile);
        } else {
            console.log('No se ha seleccionado ningún archivo');
        }
        try {
            const response = await authController.createBook(bookData, token);
            console.log('Respuesta de la creación de categoría:', response);
            // Limpiar los valores del formulario después de crear el libro
            formik.resetForm();
            setSelectedFile(null);
        } catch (error) {
            console.error('Error al crear el libro:', error);
        }
    };

    return (
        <div className='register-books'>
            <div className='title-author'>
                <TextField 
                    id="outlined-basic" 
                    label="Titulo" 
                    variant="outlined" 
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && !!formik.errors.title}
                    helperText={formik.touched.title && formik.errors.title}
                    className='field'
                    name="title"
                />
                {formik.errors.title && formik.touched.title ? (
                    <FormHelperText style={{ color: 'red', marginTop: '0.5rem' }}>
                        {formik.errors.title}
                    </FormHelperText>
                ) : null}
                <TextField 
                    id="outlined-basic" 
                    label="Autor" 
                    variant="outlined" 
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    error={formik.touched.author && !!formik.errors.author}
                    helperText={formik.touched.author && formik.errors.author}
                    className='field'
                    name="author"
                />
                {formik.errors.author && formik.touched.author ? (
                    <FormHelperText style={{ color: 'red', marginTop: '0.5rem' }}>
                        {formik.errors.author}
                    </FormHelperText>
                ) : null}
            </div>
            <div className='price-categories'>
                <TextField 
                    id="outlined-basic" 
                    label="Precio" 
                    variant="outlined" 
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && !!formik.errors.price}
                    helperText={formik.touched.price && formik.errors.price}
                    className='field'
                    name="price"
                />
                {formik.errors.price && formik.touched.price ? (
                    <FormHelperText style={{ color: 'red', marginTop: '0.5rem' }}>
                        {formik.errors.price}
                    </FormHelperText>
                ) : null}
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={categories}
                    getOptionLabel={(category) => category.name} // Asumiendo que 'name' es la propiedad que se muestra
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Categoría" />}
                    value={categories.find((category) => category._id === formik.values.category)} // Encuentra la categoría por su ID
                    onChange={(e, newValue) => {
                        if (newValue) {
                            console.log('Valor seleccionado en Autocomplete:', newValue);
                            setCategoryId(newValue._id); // Establece el ID de la categoría seleccionada
                        } else {
                            setCategoryId(''); // Manejo si no se selecciona nada
                        }
                    }}
                    error={formik.touched.categoryId && !!formik.errors.categoryId}
                    helperText={formik.touched.categoryId && formik.errors.categoryId}
                    className='field'
                    name="category"
                />
                {formik.errors.category && formik.touched.category ? (
                    <FormHelperText style={{ color: 'red', marginTop: '0.5rem' }}>
                        {formik.errors.category}
                    </FormHelperText>
                ) : null}
            </div>
            <div className='description-available'>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Descripción"
                    multiline
                    maxRows={10}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && !!formik.errors.description}
                    helperText={formik.touched.description && formik.errors.description}
                    className='field'
                    name="description"
                />
                {formik.errors.description && formik.touched.description ? (
                    <FormHelperText style={{ color: 'red', marginTop: '0.5rem' }}>
                        {formik.errors.description}
                    </FormHelperText>
                ) : null}
            </div>
            <div className='file-acept'>
                <InputFile
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} className='btn-file'>
                        Subir archivo
                    </Button>
                </label>
                <Button variant="contained" onClick={handleFileUpload} className='btn-file' type="submit">
                    Aceptar
                </Button>
            </div>
        </div>
    )
}

