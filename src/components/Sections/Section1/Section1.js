import React, { useState } from 'react'
import './Section1.scss';
import { useLocation } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images_notice } from '../../../assets';
import SliderComponent from '../../Slider/Slider';

export const Section1 = () => {
    const location = useLocation();
    const shouldHide = location.pathname === '/flexbox';
    
    /* const images = Array.isArray(images_notice) ? images_notice : []; */
    const noticias = [
        {
            _id : '1',
            title : 'Eclipse solar anular octubre 2023',
            subtitle: 'Durante un eclipse solar, los daños causados en nuestros ojos son irreparables. Hay que tener en cuenta que los filtros solares habituales de nuestras gafas de sol no nos protegen. Necesitamos filtros solares especiales o técnicas de proyección indirecta, fabricados de manera específica para este uso. ',
            description: 'Toda América del Norte, excepto una parte de Alaska, podrá disfrutar de este gran evento. La trayectoria del eclipse solar anular comenzará en Oregón y terminará en el Estado de Texas, pasando por otros estados California, Nevada, Utah y Nuevo México.',
            image: images_notice.notice1
        },
        {
            _id : '2',
            title : 'Lo de Ofiuco, el nuevo signo del zodiaco',
            subtitle: 'Una cuenta con unos 18.000 seguidores logra más de 30 millones de visualizaciones con el supuesto y modificado calendario astrológico de este año',
            description: 'Ofiuco no es considerado un signo zodiacal según la astrología occidental o tropical. Esto se debe a que esta corriente no toma como referencia el posicionamiento de las constelaciones para definir las fechas entre las que se desplazan los signos del zodiaco. Esta solo contempla las constelaciones para bautizar los doce fragmentos de la eclíptica, asociando además a estas partes a la energía de la figura que delinea la constelación.Petro es un payaso',
            image: images_notice.notice2
        },
        {
            _id : '3',
            title : 'Mercurio retrógrado',
            subtitle: 'Algunos signos zodiacales se verán más afectados que otros durante el desarrollo de este fenómeno.',
            description: 'Este fenómeno ocurre cuando se observa que el planeta Mercurio cambia su dirección usual y parece moverse hacia atrás en su órbita. A pesar de esta apariencia, en realidad no está retrocediendo, es una ilusión óptica causada por las trayectorias relativas de la Tierra y Mercurio en el espacio.',
            image: images_notice.notice3
        },
        {
            _id : '4',
            title : 'Un viaje por los cielos nocturnos',
            subtitle: 'De las auroras boreales del Ártico a los cielos más brillantes del Atlántico, y de los observatorios sobre las cimas alpinas a los instalados en islas mediterráneas',
            description: 'Fue Galileo Galilei quien las bautizó como auroras boreales, en 1619, tomando prestado el nombre de la diosa griega del amanecer, Aurora, y de Bóreas, el viento del Norte. El mejor momento para ver auroras boreales va de octubre a marzo, aunque en lugares como Groenlandia ya empiezan a verse desde agosto. Contra lo que muchos creen, la mayor concentración de auroras boreales no se produce en los polos, sino en una franja ovalada que los rodea algo más al sur, coincidiendo más o menos con los círculos polares.',
            image: images_notice.notice4
        },
    ]
    return (
        <div className={shouldHide ? 'hidden' : ''}>
            {/* Contenido de Section1 */}
            <div class="Section1">
                <SliderComponent noticias={noticias}/>
            </div>
        </div>
        
    )
}
