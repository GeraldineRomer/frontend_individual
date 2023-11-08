import React from 'react'
import './Contact.scss';
import { Cube } from '../../components/Cube/Cube';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Contact = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div>
            <Cube/>
            <div class="Contact">
                <div className="content">
                    <Slider {...sliderSettings}>
                        <div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Alaskan_Malamute.jpg/320px-Alaskan_Malamute.jpg"  />
                        </div>
                        <div>
                            <img src="https://www.petclic.es/wikipets/wp-content/uploads/2013/03/golden-retriever.jpg" />
                        </div>
                        <div>
                            <img src="https://tucachorrotienda.com/wp-content/uploads/2022/06/POMSKY-5.png" />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    )
}

