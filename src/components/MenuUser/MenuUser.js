import React from 'react';
import './MenuUser.scss';
import Logo  from '../../assets/img/logoblanco.png';
import  Avatar  from '../../assets/img/avatar.png';
import { Link, animateScroll as scroll } from "react-scroll";
import { Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuOptionsUser } from '../MenuOptionsUser/MenuOptionsUser';

export const MenuUser = () => {
    /* scrollToTop = () => {
        scroll.scrollToTop();
    }; */
    const burguer = () => {
        const toggle = document.getElementById('toggle');
        const items = document.getElementById('items');
        const login = document.getElementById('login');
        items.classList.toggle('open');
        login.classList.toggle('open')
        toggle.classList.toggle('close');
    }
    const cancel = () => {
        console.log('Di click en login');
        window.location.href = '/login';
        /* window.open('../Login','_self') */
    }
    return (
        <div class="container">
            <Grid container spacing={0}>
                <Grid item xs={6} md={12}>
                    <div class="menu-user" id="menu">
                        <Grid container spacing={0}>
                            <Grid item xs={0} md={1}>
                                <img src={Logo} alt="Logo UAM" class="uam"/>
                            </Grid>
                            <div class="toggle" id="toggle" onClick={burguer}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <Grid item xs={6} md={2}>
                                <label className='books'>Books&Books</label>
                            </Grid>
                            <Grid item xs={6} md={7}>
                                <div className='menu-links'>
                                    <ul id="items">
                                        <li>
                                            <Link
                                                activeClass="active"
                                                to="Section1"
                                                spy={true}
                                                smooth={true}
                                                offset={-50}
                                                duration={500}
                                            >
                                                Home
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                activeClass="active"
                                                to="Section2"
                                                spy={true}
                                                smooth={true}
                                                offset={-50}
                                                duration={500}
                                            >
                                                Lists
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                activeClass="active"
                                                to="Section3"
                                                spy={true}
                                                smooth={true}
                                                offset={-50}
                                                duration={500}
                                            >
                                                Books
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                activeClass="active"
                                                to="Section3"
                                                spy={true}
                                                smooth={true}
                                                offset={-100}
                                                duration={500}
                                            >
                                                Author
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                activeClass="active"
                                                to="Section4"
                                                spy={true}
                                                smooth={true}
                                                offset={-100}
                                                duration={500}
                                            >
                                                Book
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </Grid>
                            <Grid item xs={6} md={1}>
                                <div className='cancel-menu' >
                                    <MenuOptionsUser/>
                                </div>
                            </Grid>
                            <Grid item xs={3} md={1}>
                                <div class="avatar-container">
                                    <img src={Avatar} alt="Foto de perfil" class="avatar"/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

