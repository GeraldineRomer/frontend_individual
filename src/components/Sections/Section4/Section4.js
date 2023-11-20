import React from 'react';
import './Section4.scss';
import { Grid } from '@mui/material';
import { images_book } from '../../../assets';
import { Reveal } from '../../ScrollReveal/Reveal';

export const Section4 = () => {
    return (
        <div className='container-section4'>
            <div className="Section4">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sm={6}>
                        <Grid container spacing={2} className='info-book'>
                                <Grid item xs={12} md={12} sm={12}>
                                    <h3>Libro destacado del mes</h3>
                                </Grid>
                                <Grid item xs={12} md={12} sm={12}>
                                    <h5>El Jardín de las Mariposas</h5>
                                    <h5>Dot Hutchison</h5>
                                </Grid>
                                <Grid item xs={12} md={12} sm={12}>
                                    <p>Cerca de una aislada mansión existe un jardín 
                                        en el que un dedicado jardinero cultiva delicadas 
                                        flores. En él, protegida por frondosos árboles, 
                                        habita una exquisita y peculiar colección de mariposas 
                                        que el Jardinero, un hombre que desconoce los límites 
                                        de su obsesión por preservar la belleza, protege obsesivamente.
                                        
                                        <br/>Maya es una superviviente del jardín y ahora tiene que
                                        narrar a los agentes del FBI los horrores que vivió al 
                                        ser secuestrada, junto con otras chicas muy jóvenes, por 
                                        un asesino en serie. Su mente es presa de las más terribles 
                                        pesadillas y en su espalda, como en la de todas las otras 
                                        jóvenes mariposas, un tatuaje le recordará para siempre 
                                        el horror de su experiencia en el jardín.
                                    ​</p>
                                </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                        <img src={images_book.libro15} alt='autordelmes' className='img-book'/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
