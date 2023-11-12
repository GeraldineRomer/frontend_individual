import React, { useState } from 'react'
import './Section1.scss';
import { useLocation } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images_book } from '../../../assets';
import Slider from '../../Slider/Slider';

export const Section1 = () => {
    const location = useLocation();
    const shouldHide = location.pathname === '/flexbox';
    
    const libros = [
        {
            _id : '1',
            title : 'La Chica del Tren',
            author: 'Paula Hawkins',
            description: '¿Estabas en el tren de las 8.04? ¿Viste algo sospechoso? Rachel, sí',
            price: '$57.000',
            image: images_book.libro1
        },
        {
            _id : '2',
            title : 'El Psicoanalista',
            author: 'John Katzenbach',
            description: 'Así comienza el anónimo que recibe Frederick Satarks, psicoanalista con una larga experiencia y una vida tranquila. Starks tendrá que emplear toda su astucia y rapidez para, en quince días, averiguar quién es el autor de esa amenazadora misiva que promete hacerle la existencia imposible. De no conseguir su objetivo, deberá elegir entre suicidarse o ser testigo de cómo, uno tras otro, sus familiares y conocidos mueren por obra de un asesino, un psicópata decidido a llevar hasta el fin su sed de venganza.',
            price: '$52.000',
            image: images_book.libro2
        },
        {
            _id : '3',
            title : 'Jaque al Psicoanalista',
            author: 'John Katzenbach',
            description: 'Han pasado cinco años desde que el doctor Starks acabó con la pesadilla que casi le cuesta la vida y que arrasó con todo lo que había sido hasta entonces, descubriéndole las facetas más oscuras del alma humana, también la suya. Desde entonces Starks ha logrado reconstruir su vida profesional y vuelve a ejercer de psicoanalista en Miami atendiendo a adolescentes con graves problemas psicológicos también a pacientes adinerados de la sociedad de Florida. Sin embargo, una noche, cuando entra en su consulta, descubre tumbado en el diván a aquel al que había dado por muerto: Rumplestiltskin ha vuelto y esta vez no busca acabar con él, sino solicitar su ayuda. Por supuesto, no va a aceptar un «no» por respuesta.',
            price: '$87.000',
            image: images_book.libro3
        },
        {
            _id : '4',
            title : 'El Psicoanalista en la Mira',
            author: 'John Katzenbach',
            description: 'La vida del doctor Ricky Starks está marcada por una oscuridad persistente. Quince años han pasado desde que sufriera el primer ataque de una familia de psicópatas. En dos ocasiones, Starks ha logrado escapar de las garras mortales de esta familia, incluso presenciando la muerte de uno de ellos. Sin embargo, la sombra de la tragedia se cierne de nuevo sobre él cuando un detective lo contacta para informarle que uno de sus pacientes se ha suicidado. ¿Estarán detrás del extraño incidente Merlin y Virgil, los retorcidos hermanos del fallecido Rumplestiltskin? Muy pronto los acontecimientos se desbocan y el psicoanalista, acostumbrado a ser un salvavidas para quienes luchan contra los demonios de su mente, intentará salvarse a sí mismo. "A Ricky jamás se le ocurrió que quizá se había equivocado al suponer, desde el primer instante, que al f in sería libre."',
            price: '$98.000',
            image: images_book.libro4
        },
        {
            _id : '5',
            title : 'La Reina Roja',
            author: 'Victoria Aveyard',
            description: 'En la escuela aprendimos acerca del mundo anterior a éste, el mundo de los ángeles y los dioses que vivían en el cielo y gobernaban la tierra con amor y bondad. Algunos dicen que son leyendas, pero yo no lo creo. Los dioses aún nos dominan, han descendido de las estrellas. Y no les queda ni un ápice de bondad. En una sociedad dividida por el color de la sangre, los rojos luchan por sobrevivir bajo la sombra de los plateados, “Súper humanos” con poderes terribles que permiten manejar el mundo a su antojo. Pero cuando se revela que Mare Barrow –una joven ladronzuela roja- tiene también esas habilidades, es llevada al mundo de los plateados. Allí descubrirá que el poder es un juego peligroso y que la única certeza es la traición.',
            price: '$75.900',
            image: images_book.libro5
        },
        {
            _id : '6',
            title : 'La Espada de Cristal',
            author: 'Victoria Aveyard',
            description: 'Si hay una cosa que Mare Barrow sabe, es que ella es diferente. La sangre de Mare Barrow es roja —el color de la gente común—, pero tiene habilidades de la sangre Plata, el poder de controlar el relámpago, que la ha convertido en un arma que la corte real intenta controlar. La corona lo llama una imposibilidad, una falsificación, pero el como ella hace su escape de Maven, el príncipe — el amigo — quien la traicionó, Mare descubre algo sorprendente: no es la única de su clase. Perseguida por Maven, ahora un rey vengativo, Mare comienza a buscar y a reclutar a otros combatientes rojos y platas para unirse en la lucha contra sus opresores. Pero Mare se encuentra en un camino mortal, el riesgo de ser exactamente el tipo de monstruo que pretende derrotar. ¿Se romperá bajo el peso de la vida que es el costo de la rebelión? ¿O es que la alevosía y traición la endurecieron para siempre?',
            price: '$80.000',
            image: images_book.libro6
        },
        {
            _id : '7',
            title : 'El Retrato de Dorian Gray',
            author: 'Oscar Wilde',
            description: 'Basil Hallward es un artista que queda fuertemente impresionado por la belleza estética de un joven llamado Dorian Gray y comienza a admirarlo. Basil pinta un retrato del joven. Charlando en el jardín de Hallward, Dorian conoce a un amigo de Basil y empieza a cautivarse por la visión del mundo de Lord Henry. Exponiendo un nuevo tipo de hedonismo, Lord Henry indica que «lo único que vale la pena en la vida es la belleza, y la satisfacción de los sentidos». Al darse cuenta de que un día su belleza se desvanecerá, Dorian desea tener siempre la edad de cuando Basil le pintó en el cuadro. Mientras él mantiene para siempre la misma apariencia del cuadro, la figura retratada envejece por él. Su búsqueda del placer lo lleva a una serie de actos de lujuria; pero el retrato sirve como un recordatorio de los efectos de su alma, donde el retrato llevará la carga de su envejecimiento y sus pecados.',
            price: '$50.000',
            image: images_book.libro7
        },
        {
            _id : '8',
            title : 'Yo antes de ti',
            author: 'Jojo Moyes',
            description: 'Lou Clark sabe muchas cosas. Sabe cuántos pasos hay entre la parada del autobús y su casa. Sabe que le gusta trabajar en el café The Buttered Bun y sabe que quizá no quiera a su novio, Patrick. Lo que no sabe es que está a punto de perder su trabajo o  que son sus pequeñas rutinas las que la mantienen en su sano juicio. Will Traynor sabe que un accidente de moto se llevó sus ganas de vivir. Sabe que ahora todo le perece insignificante y triste, y sabe exactamente cómo va a solucionarlo. Lo que no sabe es que Lou está a punto de irrumpir en su mundo con una explosión de color. Y ninguno de los dos sabe que va a cambiar al otro para siempre. ',
            price: '$54.000',
            image: images_book.libro8
        },
        {
            _id : '9',
            title : 'Después de ti',
            author: 'Jojo Moyes',
            description: 'Continúa la historia de Lou después de la muerte de Will. Lou Clark tiene muchas preguntas: ¿Por qué ha terminado trabajando en el pub irlandés de un aeropuerto donde cada día tiene que ver cómo otras personas se van de viaje a conocer sitios nuevos? ¿Por qué a pesar de que ya lleva meses viviendo en su apartamento aún no se siente en casa? ¿Le perdonará su familia lo que hizo hace año y medio? ¿Y superará alguna vez la despedida del amor de su vida? Lo único que Lou sabe con certeza es que algo ha de cambiar. Y una noche sucede. Pero ¿y si la desconocida que llama a su puerta tiene incluso más preguntas y ninguna de las respuestas que ella busca? Si cierra la puerta, la vida continúa, sencilla, organizada, segura. Si la abre, lo arriesga todo de nuevo. Pero Lou una vez hizo una promesa para seguir adelante. Y si quiere cumplirla tendrá que invitarla a entrar...',
            price: '$68.000',
            image: images_book.libro9
        },
        {
            _id : '10',
            title : 'La Verdad Sobre el Caso Harry Quebert',
            author: 'Joël Dicker',
            description: 'Quién mató a Nola Kallergan es la gran incógnita a desvelar en este thriller incomparable cuya experiencia de lectura escapa a cualquier tentativa de descripción. Intentémoslo: una gran novela policíaca y romántica a tres tiempos —1975, 1998 y 2008— acerca del asesinato de una joven de quince años en la pequeña ciudad de Aurora, en New Hampshire. En 2008, Marcus Goldman, un joven escritor, visita a su mentor —Harry Quebert, autor de una aclamada novela—, y descubre que éste tuvo una relación secreta con Nola Kellergan. Poco después, Harry es arrestado y acusado de asesinato, al encontrarse el cadáver de Nola enterrado en su jardín. Marcus comienza a investigar y a escribir un libro sobre el caso. Mientras intenta demostrar la inocencia de Harry, una trama de secretos a la luz. La verdad solo llega al final de un largo, intrincado y apasionante recorrido. ',
            price: '$58.000',
            image: images_book.libro10
        },
    ]
    return (
        <div className={shouldHide ? 'hidden' : ''}>
            {/* Contenido de Section1 */}
            <div class="Section1">
                <Slider libros={libros}/>
            </div>
        </div>
        
    )
}
