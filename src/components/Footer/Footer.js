import './Footer.scss'
import React from 'react'
import {Link} from 'react-router-dom'
import Location from '../../assets/svg/location-1-svgrepo-com.svg'
import Twitter from '../../assets/svg/twitter-2-svgrepo-com.svg'
import Facebook from '../../assets/svg/facebook-round-svgrepo-com.svg'
import Instagram from '../../assets/svg/instagram-round-svgrepo-com.svg'
import Linkedin from '../../assets/svg/linkedin-round-svgrepo-com.svg'
import UamLogo from '../../assets/img/logo-removebg-preview.png'
import Contact from '../../assets/svg/contact-dm-email-svgrepo-com.svg'
import { Grid } from '@mui/material'


export const Footer = () => {
    const privacy = () => {
        console.log('Di click en privacidad');
        window.location.href = '/privacy';
        /* window.open('../Privacy','_self') */
    }
    return (
        <div className='Footer'>
            <Grid  container spacing={2} className='card'>
                <Grid item xs={12} md={4} sm={6}>
                    <div className = 'Location'>
                        <label>Ubicación y contacto:</label>
                        <Grid container spacing={2}>
                            <div className='info-location'> 
                                <Grid item xs={3} md={2} sm={2}>
                                    <a href='https://www.google.com/maps/place/Universidad+Autónoma+de+Manizales/@5.0685718,-75.5037043,16z/data=!4m6!3m5!1s0x8e476f8c1179651b:0x18322787cebd6883!8m2!3d5.0674694!4d-75.5031743!16s%2Fg%2F11csgp60y6?hl=es&entry=ttu'>
                                        <img src={Location} alt="Location" className='Svg' style={{color: '#ECEEF3'}}/>
                                    </a>
                                </Grid>
                                <Grid item xs={9} md={10} sm={10}>
                                    <Link 
                                        className='link'
                                        to='https://www.google.com/maps/place/Universidad+Autónoma+de+Manizales/@5.0685718,-75.5037043,16z/data=!4m6!3m5!1s0x8e476f8c1179651b:0x18322787cebd6883!8m2!3d5.0674694!4d-75.5031743!16s%2Fg%2F11csgp60y6?hl=es&entry=ttu'
                                    >
                                        Antigua Estación del Ferrocarril Manizales - Caldas - Colombia
                                    </Link>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid container spacing={2}>
                            <div className='info-contact'> 
                                <Grid item xs={3} md={2} sm={2}>
                                    <img src={Contact} alt="Contact" className='Svg'/>
                                </Grid>
                                <Grid item xs={7} md={10} sm={10}>
                                    <label className='contact'>booksandbooks@gmail.com</label>
                                </Grid>
                            </div>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} md={4} sm={6}>
                    <div className='SocialMedia'>
                        <label>Redes sociales:</label>
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
                <Grid item xs={12} md={4} sm={12}>
                    <div className='Privacy'>
                        <img src = {UamLogo} alt="UamLogo" className='Logo'/>
                        <div className='conf-button'>
                            <label className="privacy-button" onClick={privacy}>
                                Politica de privacidad y de datos
                            </label>
                        </div>
                        <Link to='/pqrsf'>PQRSF</Link>
                    </div>    
                </Grid>
            </Grid>
        </div>
    )
}

