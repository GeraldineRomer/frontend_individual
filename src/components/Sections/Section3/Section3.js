import React, { useState } from 'react';
import './Section3.scss';
import { useLocation } from 'react-router-dom';
import Mantenimiento from '../../../assets/img/products/descarga.jpeg';
import Refrigeracion from '../../../assets/img/products/refrigeracion.jpg';
import Mantenimiento1 from '../../../assets/img/products/mantenimiento1.webp';
import Mantenimiento2 from '../../../assets/img/products/mantenimiento2.png';
import Mantenimiento3 from '../../../assets/img/products/mantenimiento3.jpeg';
import Refrigeracion1 from '../../../assets/img/products/refrigeracion1.jpg';
import Refrigeracion2 from '../../../assets/img/products/refrigeracion2.jpg';
import Refrigeracion3 from '../../../assets/img/products/refrigeracion3.jpg';

export const Section3 = () => {
    const location = useLocation();
    const shouldHide = location.pathname === '/products';
    /* categoría seleccionada */
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const categories = [
        {   
            id:'1',
            name: 'Mantenimiento',
            description: 'Descripcion mantenimiento',
            img: Mantenimiento
        },
        {
            id:'2',
            name: 'Refrigeracion',
            description: 'Descripcion refrigeracion',
            img: Refrigeracion
        },
        {
            id:'3',
            name: 'cat3',
            description: 'info cat 3',
            img: Mantenimiento1
        },
        {
            id:'4',
            name: 'cat4',
            description: 'info cat 4',
            img: Mantenimiento2
        },
        {
            id:'5',
            name: 'cat5',
            description: 'info cat 5',
            img: Mantenimiento3
        }
    ]

    const services = [
        {
            id: '1',
            categoryId: '1',
            name: 'service1',
            imgs: [Refrigeracion1,Refrigeracion1]
        },
        {
            id: '2',
            categoryId: '1',
            name: 'service2',
            imgs: [Refrigeracion2,Refrigeracion2]
        },
        {
            id: '3',
            categoryId: '2',
            name: 'service3',
            imgs: [Refrigeracion3,Refrigeracion3]
        },
        {
            id: '4',
            categoryId: '3',
            name: 'service4',
            imgs: [Refrigeracion1,Refrigeracion1]
        },
        {
            id: '5',
            categoryId: '4',
            name: 'service5',
            imgs: [Refrigeracion2,Refrigeracion2]
        },
        {
            id: '6',
            categoryId: '5',
            name: 'service6',
            imgs: [Refrigeracion3,Refrigeracion3]
        },
    ]
    /* obtener el id de la categoría */
    const handleCategoryClick = (categoryId) => {
        // Cambiar el estado solo si se hace clic en una categoría diferente
        setSelectedCategoryId((prevSelectedCategoryId) =>
            prevSelectedCategoryId === categoryId ? null : categoryId
        );
    };
    /* filtrar el servicio */
    const filteredServices = services.filter(
        (service) => service.categoryId === selectedCategoryId
    );
    return (
        <div className={shouldHide ? 'hidden' : ''}>
            <div class="Section3">
                Products
                {/* {categories.map((category) => {
                    return (
                        <div className={`card ${ selectedCategoryId === category.id ? 'selected' : ''}`} onClick={() => handleCategoryClick(category.id)}>
                            <img src={category.img} alt={category.name} className='mantenimiento'></img>
                            <label className='title'>{category.name}</label>
                            <label className='descripcion'>{category.description}</label>
                        </div>
                    )
                })}
                {selectedCategoryId !== null && (
                    <div className="card-additional">
                        {filteredServices.map((service) => (
                        <div key={service.id} className="content-card-additional">
                            {service.imgs.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${service.name}-img-${index}`}
                                className="img"
                            />
                            ))}
                            <label className="title">{service.name}</label>
                        </div>
                        ))}
                    </div>
                )} */}
            </div>
        </div>
        
    )
}
