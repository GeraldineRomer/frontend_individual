import { Grid } from '@mui/material'
import React, { useEffect } from 'react';
import { images_book } from '../../../assets';
import './Section5.scss';
import { Reveal } from '../../ScrollReveal/Reveal';
import { motion, useAnimation } from 'framer-motion';

export const Section5 = () => {
    const mainControl = useAnimation();

    useEffect(() => {
        mainControl.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.1 }
        });
    }, [mainControl]);
    return (
        <div className='Section5'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4} className='welcome'>
                    <div className='info-title'>
                        <label className='title'>Bienvenido a</label>
                        <label className='title'>Books&Books</label>
                        <p className='description'>Aquí podrás encontrar los mejores libros de cualquier género a los mejores precios</p>
                    </div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <div className='books'>
                        <img src={images_book.libro13} alt='libro11' className='book1'/>
                        <img src={images_book.libro14} alt='libro12' className='book2'/>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

