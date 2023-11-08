import './Footer.scss'
import React from 'react'
import {Link} from 'react-router-dom'
import Location from '../../assets/svg/location-1-svgrepo-com.svg'
import Twitter from '../../assets/svg/twitter-2-svgrepo-com.svg'
import Facebook from '../../assets/svg/facebook-svgrepo-com.svg'
import Instagram from '../../assets/svg/instagram-round-svgrepo-com.svg'
import Linkedin from '../../assets/svg/linkedin-round-svgrepo-com.svg'
import UamLogo from '../../assets/img/logo-removebg-preview.png'
import Contact from '../../assets/svg/contact-request-svgrepo-com.svg'
import { Grid } from '@mui/material'


export const Footer = () => {
    const privacy = () => {
        console.log('Di click en privacidad');
        window.open('../Privacy','_self')
    }
    return (
        <div className='Footer'>
            <div className='card'>
                <div className = 'Location'>
                    <label>Ubicación y contacto:</label>
                    <img src={Location} alt="Location" className='Svg' style={{color: '#ECEEF3'}}/>
                    <img src={Contact} alt="Contact" className='Svg'/>
                </div>
                <div className='SocialMedia'>
                    <label>Redes sociales:</label>
                    <Grid container spacing={1}>
                        <Grid item xs={6} md={3}>
                            <img src={Instagram} alt='Instagram' className='Svg'/>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <img src={Facebook} alt='Facebook' className='Facebook'/>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <img src={Linkedin} alt='Linkedin' className='Svg'/>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <img src={Twitter} alt='Twitter' className='Svg'/>
                        </Grid>
                    </Grid>
                </div>
                <div className='Privacy'>
                    <img src = {UamLogo} alt="UamLogo" className='Logo'/>
                    <div className='conf-button'>
                        <label className="privacy-button" onClick={privacy}>
                            Politica de privacidad y de datos
                        </label>
                    </div>
                </div>    
            </div>
        </div>
    )
}

