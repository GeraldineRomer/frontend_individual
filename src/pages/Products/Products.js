import React from 'react';
import './Products.scss';
import { Cube } from '../../components/Cube/Cube';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ServicesList } from '../../components/ServicesList/ServiceList';
import { images } from "../../assets";
import { MenuCube } from '../../components/Menu/MenuCube';

export const Products = () => {
    const services = [
        {
            _id: "1",
            nameService: "Servicio 1",
            serviceDescription: "Descripción del servicio 1",
            avatar: images.service1,
        },
        {
            _id: "2",
            nameService: "Servicio 2",
            serviceDescription: "Descripción del servicio 2",
            avatar: images.service2,
        },
        {
            _id: "3",
            nameService: "Servicio 3",
            serviceDescription: "Descripción del servicio 3",
            avatar: images.service3,
        },
        {
            _id: "4",
            nameService: "Servicio 4",
            serviceDescription: "Descripción del servicio 4",
            avatar: images.service4,
        },
        {
            _id: "5",
            nameService: "Servicio 5",
            serviceDescription: "Descripción del servicio 5",
            avatar: images.service1,
        },
    ];
    return (
        <div>
            <MenuCube/>
            <Cube/>
            {/* <div class="Products">
                <ServicesList servicesParam={services}></ServicesList>
            </div> */}
        </div>
    )
}
