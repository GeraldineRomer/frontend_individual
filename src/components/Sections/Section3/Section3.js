import React, { useEffect, useState } from 'react';
import './Section3.scss';
import {  Grid } from '@mui/material';
import { images_book } from '../../../assets';
import { authors } from '../../../assets';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Reveal } from '../../ScrollReveal/Reveal';

export const Section3 = () => {
    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isSmallScreen = windowWidth <= 320;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,   
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        background: '#47101F',
        maxHeight: '85vh',
        maxWidth: '100vw',
        overflow: 'auto',
        flexWrap: 'wrap',
        ...(isSmallScreen && {
            // Estilos específicos para pantallas pequeñas
            top: '50%',
            maxWidth: '90vw',
            width: 350,
            height: '400px',
            maxHeight: '90vh',
            flexWrap: 'wrap',
            overflow: 'auto',
        }),
    };

    return (
        <div className='container-section3'>
            <div class="Section3">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sm={12} className='div-img-author'>
                        <img 
                            src={authors.autor1} 
                            alt='autordelmes' 
                            className='img-author' 
                            onClick={handleModalToggle}
                        />
                    </Grid>
                    
                    <Grid item xs={12} md={6} sm={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} sm={12}>
                                <h3>Autor destacado del mes</h3>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12}>
                                <h5>J.K Rowlling</h5>
                                <p>
                                    Conocida por ser la autora de la serie de libros 
                                    Harry Potter, que han superado los quinientos millones 
                                    de ejemplares vendidos. Sus libros destacados:
                                ​</p>
                            </Grid>
                            <Grid item xs={12} md={12} sm={12} className='img-author-books'>
                                <img src={images_book.libro16} alt='libro1autor' className='bk1' />
                                <img src={images_book.libro17} alt='libro2autor' className='bk2' />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Modal
                open={showModal}
                onClose={handleModalToggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='box'>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4} sm={12}>
                                <Typography 
                                    id="modal-modal-title" 
                                    variant="h6" 
                                    component="h2" 
                                    style={{ 
                                        textAlign: 'center' , 
                                        margin:'5px', 
                                        fontSize: isSmallScreen ? '12px' : '15px', 
                                        fontFamily: 'Poppins', 
                                        fontWeight: 'normal',  
                                        color: '#FCF3F7', 
                                        top: '60px', 
                                        position: 'relative',
                                        marginTop: isSmallScreen ? '10px': ''
                                        }}
                                >
                                    J.K Rowlling
                                </Typography>
                                <img 
                                    src={authors.autor1} 
                                    alt='autordelmes' 
                                    style={{ 
                                            width: '100%', 
                                            height:'auto' , 
                                            boxShadow:'0 0 10px rgba(0, 0, 0, 0.2)', 
                                            justtifyContent: 'center', 
                                            marginTop:'10px', 
                                            marginBottom:'10px', 
                                            position: 'relative', 
                                            top: '60px',
                                            display: isSmallScreen ? 'none': ''
                                            }}
                                />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Typography 
                                    id="modal-modal-title" 
                                    variant="h6" 
                                    component="h2" 
                                    style={{ 
                                        textAlign: 'justify' , 
                                        margin:'5px', 
                                        fontSize:isSmallScreen ? '11px':'15px', 
                                        fontFamily: 'Poppins', 
                                        fontWeight: 'lighter',  
                                        color: '#FCF3F7', 
                                        top: '60px', 
                                        position: 'relative'
                                        }}
                                >
                                    La persona que hizo posible que muchos niños y 
                                    adolescentes prefiriesen leer un libro a pasar 
                                    las horas muertas delante del televisor es una 
                                    tímida británica que se propuso escribir siete 
                                    entregas de la serie, que equivalen a los cursos 
                                    que el protagonista debe superar en la escuela de 
                                    magia y hechicería a la que asiste cuando se escapa 
                                    de la horrible realidad cotidiana en casa de sus mezquinos tíos.
                                    <br/>Según algunos críticos literarios, la autora 
                                    logró crear en sus novelas una inquietante atmósfera 
                                    atractiva a los ojos de lectores de muy diversa condición 
                                    y edad, a partir de influencias reconocibles en los libros 
                                    de escritores británicos como Enid Blyton, Richmal Crompton 
                                    o Roald Dahl. Pero, paradójicamente, ella misma afirmaba que 
                                    nunca pretendió escribir fantasía y que la idea le surgió a 
                                    partir de sus propios recuerdos de la infancia. Prácticamente 
                                    desconocida y con problemas económicos en la primera mitad de 
                                    la década de los noventa, cuando vivía de una modesta pensión 
                                    como desempleada, J. K. Rowling se convirtió en una mujer rica y 
                                    popular en Europa y sobre todo en Estados Unidos, donde multitudes 
                                    de niños acompañados por sus padres soportarían largas colas en 
                                    las librerías para hacerse con las últimas aventuras del pequeño mago.
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}
