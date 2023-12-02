import React, { useState, useRef  } from 'react';
import './Pqrsf.scss';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Pqrsf = () => {
    //esquema de validacion con yup
    const validationSchema = Yup.object().shape({
        selectedPersona: Yup.string().required('Seleccione una persona'),
        selectedDocumentType: Yup.string().required('Seleccione un tipo de documento'),
        documento: Yup.string().matches(/^[0-9]+$/, 'Solo se permiten números').required('Este campo es obligatorio'),
        nombre: Yup.string().required('Este campo es obligatorio'),
        apellido: Yup.string().required('Este campo es obligatorio'),
        razonSocial: Yup.string().required('Este campo es obligatorio'),
        nit: Yup.string()
        .required("El NIT es requerido")
        .matches(/^\d{9}-\d$/, "El NIT debe contener solo números"),
        correo: Yup.string().email('El correo electrónico no es válido')
                    .required('El correo electrónico es requerido')
                    .matches(/@(gmail|outlook)\.com$/, 'El correo debe ser de Gmail o Outlook'),
        selectedQueja: Yup.string().required('Seleccione un tipo de petición'),
        titulo: Yup.string().required('Este campo es obligatorio'),
    });

    //formik
    const formik = useFormik({
        initialValues: {
            selectedPersona: null,
            selectedDocumentType: null,
            documento: '',
            nombre: '',
            apellido: '',
            razonSocial: '',
            nit: '',
            correo: '',
            selectedQueja: null,
            titulo: '',
        },
        validationSchema,
        onSubmit: (values) => {
            // Manejar la lógica de envío del formulario
            console.log('Formulario enviado:', values);
        },
    });
    
    const persona = [
        { label: 'Natural'},
        { label: 'Jurídica'},
    ]
    const documentTypes = [
        { label: "Cédula" },
        { label: "Cédula Extranjera" },
        { label: "Tarjeta Identidad" },
        { label: "Registro Civil" },
    ];
    const queja = [
        { label: "Petición" },
        { label: "Queja" },
        { label: "Reclamo" },
        { label: "Sugerencia" },
        { label: "Felicitación" },
    ];
    //texto enriquecido
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    //mostrar campos según el tipo de persona
    const [showNaturalFields, setShowNaturalFields] = useState(false);
    const [showJuridicaFields, setShowJuridicaFields] = useState(false);

    return (
        <div className='pqrsf'>
            <div className='mask-pqrsf'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} className='col'>
                        <Autocomplete
                            required
                            disablePortal
                            id="combo-box-demo"
                            options={persona}
                            value={formik.values.selectedPersona}
                            onChange={(event, newValue) => {
                                const selectedValue = newValue ? newValue.label : null;
                                formik.setFieldValue('selectedPersona', selectedValue);
                                // Mostrar los campos correspondientes según la selección
                                if (newValue && newValue.label === 'Natural') {
                                    setShowNaturalFields(true);
                                    setShowJuridicaFields(false);
                                } else if (newValue && newValue.label === 'Jurídica') {
                                    setShowJuridicaFields(true);
                                    setShowNaturalFields(false);
                                }
                            }}
                            onBlur={formik.handleBlur('selectedPersona')}
                            renderInput={(params) => <TextField {...params} label="Persona" />}
                            className='input-pqrsf'
                        />
                        {formik.touched.selectedPersona && formik.errors.selectedPersona ? (
                            <div>{formik.errors.selectedPersona}</div>
                        ) : null}
                        {showNaturalFields && (
                            <>
                                <Autocomplete
                                    required
                                    disablePortal
                                    id="combo-box-demo"
                                    options={documentTypes}
                                    value={formik.values.selectedDocumentType}
                                    onChange={(event, newValue) => {
                                        const selectedValue = newValue ? newValue.label : null;
                                        formik.setFieldValue('selectedDocumentType', selectedValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Tipo de documento" />}
                                    className='input-pqrsf'
                                />
                                {formik.touched.selectedDocumentType && formik.errors.selectedDocumentType ? (
                                    <div>{formik.errors.selectedDocumentType}</div>
                                ) : null}
                                <TextField 
                                    required
                                    id="outlined-basic" 
                                    label="Nombre" 
                                    name="nombre"
                                    variant="outlined" 
                                    className='input-pqrsf'
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                    helperText={formik.touched.nombre && formik.errors.nombre}
                                />
                            </>
                        )}
                        {showJuridicaFields && (
                            <>
                                <TextField 
                                    required
                                    id="outlined-basic" 
                                    label="Razón Social" 
                                    variant="outlined" 
                                    className='input-pqrsf'
                                    value={formik.values.razonSocial}
                                    onChange={formik.handleChange}
                                    error={formik.touched.razonSocial && Boolean(formik.errors.razonSocial)}
                                    helperText={formik.touched.razonSocial && formik.errors.razonSocial}
                                    name="razonSocial"
                                />
                            </>
                        )}
                        <TextField 
                            required
                            id="outlined-basic" 
                            label="Titulo" 
                            variant="outlined" 
                            className='input-pqrsf'
                            value={formik.values.titulo}
                            onChange={formik.handleChange}
                            error={formik.touched.titulo && Boolean(formik.errors.titulo)}
                            helperText={formik.touched.titulo && formik.errors.titulo}
                            name="titulo"
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className='col'>
                        <Autocomplete
                            required
                            disablePortal
                            id="combo-box-demo"
                            options={queja}
                            value={formik.values.selectedQueja}
                            onChange={(event, newValue) => {
                                const selectedValue = newValue ? newValue.label : null;
                                formik.setFieldValue('selectedQueja', selectedValue);
                            }}
                            renderInput={(params) => <TextField {...params} label="Tipo de queja" />}
                            className='input-pqrsf'
                        />
                        {formik.touched.selectedQueja && formik.errors.selectedQueja ? (
                            <div>{formik.errors.selectedQueja}</div>
                        ) : null}
                    {showNaturalFields && (
                            <>
                                <TextField 
                                    required
                                    id="outlined-basic" 
                                    label="Documento" 
                                    variant="outlined" 
                                    className='input-pqrsf'
                                    value={formik.values.documento}
                                    onChange={formik.handleChange}
                                    error={formik.touched.documento && Boolean(formik.errors.documento)}
                                    helperText={formik.touched.documento && formik.errors.documento}
                                    name="documento"
                                />
                                <TextField 
                                    required
                                    id="outlined-basic" 
                                    label="Apellido" 
                                    variant="outlined" 
                                    className='input-pqrsf'
                                    value={formik.values.apellido}
                                    onChange={formik.handleChange}
                                    error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                                    helperText={formik.touched.apellido && formik.errors.apellido}
                                    name="apellido"
                                />
                            </>
                        )}
                        {showJuridicaFields && (
                            <>
                                <TextField 
                                    required
                                    id="outlined-basic" 
                                    label="NIT" 
                                    variant="outlined" 
                                    className='input-pqrsf'
                                    value={formik.values.nit}
                                    onChange={formik.handleChange}
                                    error={formik.touched.nit && Boolean(formik.errors.nit)}
                                    helperText={formik.touched.nit && formik.errors.nit}
                                    name="nit"
                                />
                            </>
                        )}
                        <TextField 
                            required
                            id="outlined-basic" 
                            label="Correo" 
                            variant="outlined" 
                            className='input-pqrsf'
                            value={formik.values.correo}
                            onChange={formik.handleChange}
                            error={formik.touched.correo && Boolean(formik.errors.correo)}
                            helperText={formik.touched.correo && formik.errors.correo}
                            name="correo"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <div className='editor'>
                            <Editor
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue="<p>This is the initial content of the editor.</p>"
                                init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
                                    'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
                                    'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
                                ],
                                toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
                                    'alignleft aligncenter alignright alignjustify | ' +
                                    'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </div>
                    </Grid>
                </Grid>
                <div>
                    <Button variant="contained" onClick={formik.handleSubmit}>Aceptar</Button>
                </div>
            </div>
        </div>
    )
}

