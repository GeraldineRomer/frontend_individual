import React from 'react'
import './Flexbox.scss';
import { Cube } from '../../components/Cube/Cube';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Flexbox = () => {
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
            <div class="Flexbox">
                <div className="content">
                    <Slider {...sliderSettings}>
                        <div class="slide-img">
                            <img src="https://www.eltiempo.com/files/article_main_1200/uploads/2020/12/11/5fd3fa73adf98.jpeg"  />
                        </div>
                        <div class="slide-img">
                            <img src="http://placekitten.com/g/400/200" />
                        </div>
                        <div class="slide-img">
                            <img src="https://www.elespectador.com/resizer/YAi4dCYuQ0Wzi9owO9dQbMRL6SU=/525x350/filters:quality(60):format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/KHYLDDXDT5BCLBABKRR6LXRLQU.jpg" />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    )
}

