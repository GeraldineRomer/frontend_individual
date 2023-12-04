import React, { useEffect, useState } from 'react';
import '../../App.scss';
import './Slider.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { Button, Grid, Fab } from '@mui/material';

/* Modal */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useFavorites } from '../FavoriteList/FavoriteList';

const Slider = ({ libros }) => {

    const [open, setOpen] = React.useState(false);
    const [selectedLibro, setSelectedLibro] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Verificar si hay un token en localStorage
    }, []);

    const handleOpen = (libro) => {
        setSelectedLibro(libro)
        setOpen(true)
    };
    const handleClose = () => {
        setSelectedLibro(null)
        setOpen(false)
    };

    const { addFavorite } = useFavorites();

    const handleAddToFavorite = (notice) => {
        const token = localStorage.getItem('access');
        if (!token) {
            window.location.href = '/login'; // Redireccionar al login si no hay token en localStorage
            return;
        }
        if (notice) {
            addFavorite(notice); // Agregar el ID a la lista de favoritos a través del contexto
        }
    };

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
        borderRadius: '10px',
        background: 'linear-gradient(to bottom, #8C2844, #47101F)',
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
        <>
            <Grid container spacing={0}>
                <Grid item xs={12} md={12}>
                        <Swiper
                            //slidesPerView={4} // Mostrar un slide por vista en pantallas pequeñas
                            breakpoints={{ // Ajustar la cantidad de slides por vista en diferentes tamaños de pantalla
                                320:{
                                    slidesPerView: 1
                                },
                                768: {
                                    slidesPerView: 2 // Mostrar 2 slides por vista en pantallas de 768px o más
                                },
                                1024: {
                                    slidesPerView: 4 // Mostrar 3 slides por vista en pantallas de 1024px o más
                                }
                            }}
                            centeredSlides={false}
                            spaceBetween={30}
                            //grabCursor={true}
                            loop={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: true,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Pagination, Navigation, Autoplay]}
                            className="mySwiper"
                        >
                                    {libros.map((libro, index) => (
                                        <SwiperSlide key={index}>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12} md={12}>
                                                    <div className='img-book'>
                                                        <img 
                                                            src={`data:image/png;base64,${libro.images[0]}`}
                                                            alt={`Portada de ${libro.title}`} />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <div className='info'>
                                                        <label>{libro.title}</label>
                                                        <label>{libro.author}</label>
                                                        <label>${libro.price}</label>
                                                        <Button variant="contained" className='btn' onClick={() => handleOpen(libro)}>Ver más</Button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </SwiperSlide>
                                    ))}
                        </Swiper>
                </Grid>
            </Grid>
            <div className='modal'>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {selectedLibro && (
                            <div className='box'>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} className='book-modal'>
                                        <img 
                                            src={`data:image/png;base64,${selectedLibro.images[0]}`}
                                            alt={`Portada de ${selectedLibro.title}`} 
                                            style={{ 
                                                width: isSmallScreen ? '50%' : '100%', 
                                                height:'auto' , 
                                                boxShadow:'0 0 10px rgba(0, 0, 0, 0.2)', 
                                                justifyContent: 'center', 
                                                marginTop:'10px', 
                                                marginBottom: isSmallScreen ? '0':'10px', 
                                                position: isSmallScreen ? 'relative':'relative', 
                                                top: isSmallScreen ? '10%':'60px',
                                                left: isSmallScreen ? '25%':'',
                                                display: isSmallScreen ? 'none':'',
                                                }}
                                        />
                                        <div className="button-fav-group">
                                            <Fab className="btn-icon" color="" aria-label="Favorite icon" onClick={() => handleAddToFavorite(selectedLibro)}>
                                                <FavoriteIcon/>
                                            </Fab>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography 
                                            id="modal-modal-title" 
                                            variant="h6" 
                                            component="h2" 
                                            style={{ 
                                                textAlign: 'center' , 
                                                margin:'5px', 
                                                fontSize: isSmallScreen ? '18px' : '20px', 
                                                fontFamily: 'Poppins', 
                                                fontWeight: 'normal',  
                                                color: '#FCF3F7', 
                                                top: '60px', 
                                                position: 'relative'
                                                }}
                                        >
                                            {selectedLibro.title}
                                        </Typography>
                                        <Typography 
                                            id="modal-modal-description" 
                                            sx={{ mt: 2 }} 
                                            style={{ 
                                                textAlign: 'center' , 
                                                margin:'5px', 
                                                fontSize:'12px', 
                                                fontFamily: 'Poppins', 
                                                fontWeight: 'lighter',  
                                                color: '#FCF3F7', 
                                                position: 'relative', 
                                                top: '60px'
                                                }}
                                        >
                                            {selectedLibro.author}
                                        </Typography>
                                        <Typography 
                                            id="modal-modal-description" 
                                            sx={{ mt: 2 }} 
                                            style={{ 
                                                    textAlign: 'center' , 
                                                    margin:'5px', 
                                                    fontSize:'12px', 
                                                    fontFamily: 'Poppins', 
                                                    fontWeight: 'lighter',  
                                                    color: '#FCF3F7', 
                                                    position: 'relative', 
                                                    top: '60px'
                                                    }}
                                        >
                                            ${selectedLibro.price}
                                        </Typography>
                                        <Typography 
                                            id="modal-modal-description" 
                                            sx={{ mt: 2 }} 
                                            style={{ 
                                                    textAlign: 'justify' , 
                                                    margin:'5px', 
                                                    fontSize:isSmallScreen ? '12px':'15px', 
                                                    fontFamily: 'Poppins', 
                                                    fontWeight: 'lighter',  
                                                    color: '#FCF3F7', 
                                                    position: 'relative', 
                                                    top: '60px',  
                                                    marginBottom:'10px'
                                                    }}
                                        >
                                            {selectedLibro.description}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        )}
                    </Box>
                </Modal>
            </div>
        </>
    );
};

export default Slider;
