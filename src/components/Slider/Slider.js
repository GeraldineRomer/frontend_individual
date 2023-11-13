import React, { useRef, useState } from 'react';
import '../../App.scss';
import './Slider.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Button, Grid, Fab } from '@mui/material';

/* Modal */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add, Star } from '@mui/icons-material';
import { useFavorites } from '../FavoriteList/FavoriteList';
import { useAdds } from '../AddList/AddList';

/* aqui van las importaciones necesarias para el modal */
/* import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Fab, Grid } from '@mui/material';
 */

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
    background: 'linear-gradient(to right bottom ,#e383aa , #a82e53 70%)',
    borderColor: '#707EE4',
    maxHeight: '85vh',
    maxWidth: '100vw',
    overflow: 'auto',
    flexWrap: 'unwrap'
};


const Slider = ({ libros }) => {
    const [isFirstSlide, setIsFirstSlide] = useState(true);

    const handleSlideChange = (swiper) => {
        setIsFirstSlide(swiper.activeIndex === 0);
    };

    const [open, setOpen] = React.useState(false);
    const [selectedLibro, setSelectedLibro] = useState(null);

    const handleOpen = (libro) => {
        setSelectedLibro(libro)
        setOpen(true)
    };
    const handleClose = () => {
        setSelectedLibro(null)
        setOpen(false)
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
        <>
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
                onSlideChange={(swiper) => handleSlideChange(swiper)}
            >
                <div className={`info-title ${isFirstSlide ? '' : 'hidden'}`}>
                    <label className='title'>Bienvenido a</label>
                    <label className='title'>Books&Books</label>
                    <p className='description'>Aquí podrás encontrar los mejores libros de cualquier género a los mejores precios</p>
                </div>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={8}>
                        {libros.map((libro, index) => (
                            <SwiperSlide key={index}>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} md={12}>
                                        <div className='img-book'>
                                            <img src={libro.image} alt={`Portada de ${libro.title}`} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <div className='info'>
                                            <label>{libro.title}</label>
                                            <label>{libro.author}</label>
                                            <label>{libro.price}</label>
                                            <Button variant="contained" className='btn' onClick={() => handleOpen(libro)}>Ver más</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </SwiperSlide>
                        ))}
                    </Grid>
                </Grid>
            </Swiper>
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
                                    <Grid item xs={6} md={6}>
                                        <img src={selectedLibro.image} alt={`Portada de ${selectedLibro.title}`} style={{ width: '100%', height:'auto' , boxShadow:'0 0 10px rgba(0, 0, 0, 0.2)', justtifyContent: 'center', marginTop:'10px', marginBottom:'10px', position: 'relative', top: '60px'}}/>
                                        <div className="button-fav-group">
                                            <Fab className="btn-icon" color="" aria-label="Favorite icon" onClick={() => handleAddToFavorite(selectedLibro)}>
                                                <Star/>
                                            </Fab>
                                            <Fab className="btn-icon" color="" aria-label="Add icon" onClick={() => handleAddToAdd(selectedLibro)}>
                                                <Add/>
                                            </Fab>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} md={6}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center' , margin:'5px', fontSize:'20px', fontFamily: 'MontaguSlab', fontWeight: 'normal',  color: '#FCF3F7', top: '60px', position: 'relative'}}>
                                            {selectedLibro.title}
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: 'center' , margin:'5px', fontSize:'12px', fontFamily: 'MontaguSlab', fontWeight: 'lighter',  color: '#FCF3F7', position: 'relative', top: '60px'}}>
                                            {selectedLibro.author}
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: 'center' , margin:'5px', fontSize:'12px', fontFamily: 'MontaguSlab', fontWeight: 'lighter',  color: '#FCF3F7', position: 'relative', top: '60px'}}>
                                            {selectedLibro.price}
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ textAlign: 'justify' , margin:'5px', fontSize:'15px', fontFamily: 'MontaguSlab', fontWeight: 'lighter',  color: '#FCF3F7', position: 'relative', top: '60px',  marginBottom:'10px'}}>
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
