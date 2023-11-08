import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Cube.scss';

export const Cube = () => {
    const [animationPaused, setAnimationPaused] = useState(false);
    const handleCubeClick = () => {
        console.log('Di clic en el cubo');
        if (!animationPaused) {
            console.log('Animación pausada');
            const cube = document.getElementById('animatedCube');
            const optionsContainer = document.getElementById('options');
            if (cube && optionsContainer) {
                cube.style.animationPlayState = 'paused';
                optionsContainer.style.display = 'flex';
                optionsContainer.style.flexDirection = 'column';
                setAnimationPaused(true);
                setTimeout(() => {
                    cube.style.animationPlayState = 'running';
                    setAnimationPaused(false);
                    optionsContainer.style.display = 'none';
                }, 5000);
            }
        }
    };

    // Estado para controlar si las secciones deben estar ocultas
    const [hideSections, setHideSections] = useState(false);

    // Función para cambiar el estado de hideSections
    const toggleHideSections = () => {
        setHideSections(!hideSections);
    };

    const products = () => {
        console.log('Di clic en la opción 1');
        window.open('../Products', '_self'); // Abre una nueva ventana o pestaña
    };
    const contact = () => {
        console.log('Di clic en la opción 2');
        window.open('../Contact', '_self'); // Abre una nueva ventana o pestaña
    };
    const flexbox = () => {
        console.log('Di clic en la opción 3');
        window.open('../Flexbox', '_self'); // Abre una nueva ventana o pestaña
    };
    return (
        <div class="loader">
            <div class="cube" id="animatedCube" onClick={handleCubeClick}>
                <div class="front"></div>
                <div class="back"></div>
                <div class="top"></div>
                <div class="bottom"></div>
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <div class="options" id="options">
                <div class="cube2" id="option2" >
                    <div class="front">
                        <button class="flexbox" onClick={flexbox}>Flexbox</button>
                        <button class="contact" onClick={contact}>Contact</button>
                        <button class="products" onClick={products}>Products</button>
                    </div>
                    <div class="back"></div>
                    <div class="top"></div>
                    <div class="bottom"></div>
                    <div class="left"></div>
                    <div class="right"></div>
                </div>
            </div>
        </div>
    )
}

