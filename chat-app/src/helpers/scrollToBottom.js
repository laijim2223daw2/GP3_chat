import { animateScroll } from 'react-scroll';

/**
 * Desplaza el scroll hasta la parte inferior del elemento especificado.
 * @param {string} id - ID del elemento contenedor
 */
export const scrollToBottom = (id) => {

    animateScroll.scrollToBottom({
        containerId: id,
        duration: 0
    });

}

/**
 * Desplaza el scroll animadamente hasta la parte inferior del elemento especificado.
 * @param {string} id - ID del elemento contenedor
 */
export const scrollToBottomAnimated = (id) => {

    animateScroll.scrollToBottom({
        containerId: id,
        duration: 250
    });

}
