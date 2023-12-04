import './Footer.scss'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Location from '../../assets/svg/location-circle-fill-svgrepo-com.svg'
import Facebook from '../../assets/svg/facebook-round-svgrepo-com.svg'
import Instagram from '../../assets/svg/instagram-round-svgrepo-com.svg'
import Linkedin from '../../assets/svg/linkedin-round-svgrepo-com.svg'
import LogoGris from '../../assets/img/logo-color.png'
import Contact from '../../assets/svg/email-circle-fill-svgrepo-com.svg'
import { Grid } from '@mui/material'
import axios from 'axios';

export const Footer = () => {
    const privacy = () => {
        console.log('Di click en privacidad');
        window.location.href = '/privacy';
        /* window.open('../Privacy','_self') */
    }
    const [coordinates, setCoordinates] = useState({});
    const getLocationCoordinates = async () => {
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;

                    const manizalesStationLat = 5.066894;
                    const manizalesStationLon = -75.505324;

                    const response = await axios.get(
                        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=877f7c4cf46cf5436b3c6d95a12449d8`
                    );

                    if (response.status === 200) {
                        const { data } = response;
                        setCoordinates({
                            latitude: data.coord.lat,
                            longitude: data.coord.lon,
                        });
                        const googleMapsLink = `https://www.google.com/maps/dir/${latitude},${longitude}/${manizalesStationLat},${manizalesStationLon}`;
                        window.open(googleMapsLink, '_blank');
                    } else {
                        throw new Error('Error al obtener las coordenadas');
                    }
                });
            } else {
                console.error('Geolocalización no es compatible en este navegador.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className='Footer'>
            <Grid  container spacing={2} className='card'>
                <Grid item xs={12} md={3} sm={6}>
                    <div className = 'Location'>
                    <label className='location-title'>Ubicación y contacto</label>
                        <div className='cont-info' >
                            <Grid item xs={12} md={6} sm={12} >
                                <div className='info-location'> 
                                    <a onClick={getLocationCoordinates}>
                                        <img src={Location} alt="Location" className='location-svg'/>
                                    </a>
                                    <Link 
                                        className='link'
                                        onClick={getLocationCoordinates}
                                    >
                                        Antigua Estación del Ferrocarril Manizales
                                    </Link>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6} sm={12} >
                                <div className='info-contact'> 
                                    <img src={Contact} alt="Contact" className='contact-svg'/>
                                    <p className='contact'>
                                        booksandbooks@gmail.com
                                    </p>
                                </div>
                            </Grid>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={3} >
                    <div className='horarios'>
                        <label className='horario-title'>Horarios de atención</label>
                        <div className='horario'>
                            <h5>Lunes a jueves: 7:30 a.m - 7:30 p.m.</h5>
                            <h5>Viernes: 8:00 a.m - 6:00 p.m.</h5>
                            <h5>Sábado: 10:00 a.m - 1:00 p.m.</h5>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} md={3} sm={6}>
                    <div className='SocialMedia'>
                        <label className='social-title'>Redes sociales</label>
                        <Grid container spacing={0} className='icons-social-media'>
                            <Grid item xs={4} md={4} sm={4} className='ig'>
                                <a href='https://www.instagram.com/uammanizales'>
                                    <img src={Instagram} alt='Instagram' className='Svg'/>
                                </a>
                            </Grid>
                            <Grid item xs={4} md={4} sm={4} className='fb'>
                                <a href='https://www.facebook.com/UAMManizales'>
                                    <img src={Facebook} alt='Facebook' className='Svg'/>
                                </a>
                            </Grid>
                            <Grid item xs={4} md={4} sm={4} className='in'>
                                <a href='https://www.linkedin.com/home'>
                                    <img src={Linkedin} alt='Linkedin' className='Svg'/>
                                </a>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} md={3} sm={12}>
                    <div className='Privacy'>
                        <img src = {LogoGris} alt="UamLogo" className='Logo'/>
                        <div className='conf-button'>
                            <label className="privacy-button" onClick={privacy}>
                                Politica de privacidad y de datos
                            </label>
                        </div>
                        <Link to='/pqrsf' className='link'>PQRSF</Link>
                    </div>    
                </Grid>
            </Grid>
        </div>
    )
}

