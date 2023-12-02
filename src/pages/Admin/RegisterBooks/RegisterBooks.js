import React, { useEffect, useState } from 'react';
import './RegisterBooks.scss';
import { Autocomplete, Button, FormControlLabel, Switch, TextField, Input, IconButton, styled, } from '@mui/material';
import { Auth } from '../../../api/auth'; 
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const InputFile = styled('input')({
    display: 'none',
});

const authController = new Auth();

export const RegisterBooks = () => {
    //hooks para manejar los campos del formulario
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [switchValue, setSwitchValue] = useState(false);
    const [switchActive, setSwitchActive] = useState(false);
    const [price, setPrice] = useState(0);
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
    const handleFileUpload = async () => {
        console.log("category -> ", categoryId);
        const bookData = {
            title: title,
            author: author,
            price: price,
            description: description,
            category: categoryId,
            status: switchValue,
            images: selectedFile,
            active: switchActive
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
        } catch (error) {
            console.error('Error al crear el libro:', error);
        }
    };

    return (
        <div>
            <TextField 
                id="outlined-basic" 
                label="Titulo" 
                variant="outlined" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField 
                id="outlined-basic" 
                label="Autor" 
                variant="outlined" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)}
            />
            <TextField
                id="outlined-multiline-flexible"
                label="Descripción"
                multiline
                maxRows={10}
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
            />
            <TextField 
                id="outlined-basic" 
                label="Precio" 
                variant="outlined" 
                type="number"
                value={price} 
                onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={categories}
                getOptionLabel={(category) => category.name} // Asumiendo que 'name' es la propiedad que se muestra
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Categoría" />}
                value={categories.find((category) => category._id === categoryId)} // Encuentra la categoría por su ID
                onChange={(e, newValue) => {
                    if (newValue) {
                        setCategoryId(newValue._id); // Establece el ID de la categoría seleccionada
                    } else {
                        setCategoryId(''); // Manejo si no se selecciona nada
                    }
                }}
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={switchValue}
                        onChange={(e) => setSwitchValue(e.target.checked)} // Actualiza el estado interno del Switch
                    />
                }
                label="Disponible"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={switchActive}
                        onChange={(e) => setSwitchActive(e.target.checked)} // Actualiza el estado interno del Switch
                    />
                }
                label="Activo"
            />
            <InputFile
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                    Subir archivo
                </Button>
            </label>
            <Button variant="contained" onClick={handleFileUpload}>
                Aceptar
            </Button>
        </div>
    )
}

