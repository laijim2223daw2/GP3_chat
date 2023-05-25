import moment from 'moment';

/**
 * Obtiene la hora y el mes formateados de una fecha dada.
 * @param {string} fecha - Fecha en formato string
 * @returns {string} - Hora y mes formateados
 */
export const horaMes = (fecha) => {

    const hoyMes = moment(fecha);

    return hoyMes.format('HH:mm a | MMMM Do');

}
