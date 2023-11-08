import React, { useState } from 'react';
import './TraslucentMenu.scss';

export const TraslucentMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const toggleMenu = () => {
        setMenuVisible((prevState) => !prevState);
    }
    return (
        <div className='navbar-traslucent-style'>
            <nav className={`mask ${menuVisible ? "visible":""}`}>
                <ul className='menu-list'>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#'>About</a></li>
                    <li><a href='#'>Contact</a></li>
                    <li><a href='#'>Contact</a></li>
                </ul>
                <button className='menu-hide-navbar' onClick={toggleMenu}>Menu</button>
            </nav>
            <img src='https://images.unsplash.com/photo-1629812456605-4a044aa38fbc?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTc3ODI1OTg&ixlib=rb-1.2.1&q=80'></img>
        </div>
    )
}

