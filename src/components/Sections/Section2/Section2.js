import React from 'react'
import './Section2.scss';
import { useLocation } from 'react-router-dom';
import {  Star } from '@mui/icons-material';
import { useFavorites } from '../../FavoriteList/FavoriteList';
import { Grid } from '@mui/material';

export const Section2 = () => {
    const location = useLocation();
    const shouldHide = location.pathname === '/contact';
    const { favorites } = useFavorites();
    console.log(favorites);
    return (
        <div className={shouldHide ? 'hidden' : ''}>
            {/* Contenido de Section1 */}
            <div class="Section2">
                <div className='cards'>
                    <div className='card-favorites'>
                        <Grid container spacing={0}>
                            <Grid item xs={6} md={8}>
                                <h1 className='title'>Lista de Favoritos</h1>
                            </Grid>
                            <Grid item xs={6} md={4}>
                                <div className='icon-star'>
                                    <Star className='star'/>
                                </div>
                            </Grid>
                        </Grid>
                        <div>
                            {favorites.map((favorite, index) => (
                                <div key={index} className='card'>
                                    <img 
                                        src={`data:image/png;base64,${favorite.images[0]}`}
                                        alt={favorite.title} 
                                        className='img-list' />
                                    <div className='info'>
                                        <h2 className='text'>{favorite.title}</h2>
                                        <h3 className='text'>{favorite.author}</h3>
                                        <h4 className='text'>${favorite.price}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
