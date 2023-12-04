import React from 'react';
import './MenuUser.scss';
import Logo  from '../../assets/img/logo-color.png';
import { Link, animateScroll as scroll } from "react-scroll";
import { Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuOptionsUser } from '../MenuOptionsUser/MenuOptionsUser';

export const MenuUser = () => {
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
                        <Grid container spacing={2}>
                            <Grid item xs={0} md={1}>
                                <img src={Logo} alt="Logo" class="uam"/>
                            </Grid>
                            <div class="toggle" id="toggle" onClick={burguer}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <Grid item xs={6} md={3}>
                                <label className='books-user'>Books&Books</label>
                            </Grid>
                            <Grid item xs={6} md={7}>
                                <div className='menu-links'>
                                    <ul id="items">
                                        <li>
                                            <Link
                                                activeClass="active"
                                                to="Section5"
                                                spy={true}
                                                smooth={true}
                                                offset={-100}
                                                duration={500}
                                            >
                                                Inicio
                                            </Link>
                                            <Link
                                                activeClass="active"
                                                to="Section1"
                                                spy={true}
                                                smooth={true}
                                                offset={-30}
                                                duration={500}
                                            >
                                                Libros
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                activeClass="active"
                                                to="Section2"
                                                spy={true}
                                                smooth={true}
                                                offset={-100}
                                                duration={500}
                                            >
                                                Favoritos
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
                                                Autor
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
                                                Libro
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                activeClass="active"
                                                to="Section6"
                                                spy={true}
                                                smooth={true}
                                                offset={-30}
                                                duration={500}
                                            >
                                                Nuevo
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
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

