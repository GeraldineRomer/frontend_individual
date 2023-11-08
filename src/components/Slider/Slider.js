import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.scss';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fab, Grid } from '@mui/material';
import { Add, Star } from '@mui/icons-material';
import { useFavorites } from '../FavoriteList/FavoriteList';
import { useAdds } from '../AddList/AddList';
import '../../App.scss';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    border: '2px solid #707EE4',
    boxShadow: 24,
    p: 4,   
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    background: 'linear-gradient(to right,#45488D,#31356F)',
    borderColor: '#707EE4',
    overflowY: 'auto', // Agrega una barra de desplazamiento vertical
    maxHeight: '80vh',
    maxWidth: '80vw',
    fontFamily: 'Timeless'
};

const SliderComponent = ({ noticias }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000
    };

    const [openModal, setOpenModal] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);

    const handleOpen = (noticia) => {
        setSelectedNotice(noticia);
        setOpenModal(true);
    };

    const handleClose = () => {
        setSelectedNotice(null);
        setOpenModal(false);
    };

    const { addFavorite } = useFavorites();
    const { addAdd } = useAdds();

    const handleAddToFavorite = (notice) => {
        if (notice) {
            addFavorite(notice); // Agregar el ID a la lista de favoritos a través del contexto
        }
    };

    const handleAddToAdd = (notice) => {
        if (notice) {
            addAdd(notice); // Agregar el ID a la lista de favoritos a través del contexto
        }
    };

    return (
        <div className="slider-container">
        <Slider {...sliderSettings} >
            {noticias.map((noticia, index) => (
                <div key={index}>
                    <Grid container spacing={0}>
                        <Grid item xs={6} md={8}>
                            <img src={noticia.image} alt={`Imagen ${index + 1}`} className="images" />
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <label className="title">{noticia.title}</label>
                            <label className="subtitle">{noticia.subtitle}</label>
                            <div className="conf-button">
                                <button className="button-more" onClick={() => handleOpen(noticia)}>
                                    Ver más
                                </button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            ))}
        </Slider>
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            {selectedNotice && (
                <div style={{borderRadius: '10px'}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' ,  fontWeight: 'bold' , marginBottom:'20px', marginTop: '60px', fontFamily: 'Timeless-Bold', color: '#E3ECFC'}} >
                        {selectedNotice.title}
                    </Typography>
                    <img
                        src={selectedNotice.image}
                        alt={selectedNotice.title}
                        style={{ width: '400px', height: 'auto', borderRadius: '5px' , boxShadow:'0 0 10px rgba(0, 0, 0, 0.2)', justtifyContent: 'center', position: 'relative', left: '20%', marginBottom:'15px'}}
                    />
                    <Typography id="modal-modal-subtitle" variant="h6" component="h2" style={{ textAlign: 'center' , margin:'5px', fontSize:'13px', fontFamily: 'Timeless', fontStyle: 'italic', fontWeight: 'lighter',  color: '#CCDAF9'}}>
                        {selectedNotice.subtitle}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: 'justify' , margin:'5px', fontSize:'15px', fontFamily: 'Timeless',  color: '#CCDAF9'}}>
                        {selectedNotice.description}
                    </Typography>
                    <div className="button-fav-group">
                        <Fab className="btn-icon" color="" aria-label="Favorite icon" onClick={() => handleAddToFavorite(selectedNotice)}>
                            <Star/>
                        </Fab>
                        <Fab className="btn-icon" color="" aria-label="Add icon" onClick={() => handleAddToAdd(selectedNotice)}>
                            <Add/>
                        </Fab>
                    </div>
                </div>
            )}
            </Box>
        </Modal>
        </div>
    );
};

export default SliderComponent;
