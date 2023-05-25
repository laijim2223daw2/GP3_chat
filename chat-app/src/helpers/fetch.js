const baseUrl = process.env.REACT_APP_API_URL;

/**
 * Realiza una solicitud a la API sin incluir un token de autenticación.
 * @param {string} endpoint - Endpoint de la API
 * @param {object} data - Datos a enviar en la solicitud
 * @param {string} method - Método de la solicitud (por defecto es 'GET')
 * @returns {Promise<object>} - Respuesta de la API en formato JSON
 */
export const fetchSinToken = async (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {
        const resp = await fetch(url);
        return await resp.json();
    } else {
        const resp = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await resp.json();
    }

}

/**
 * Realiza una solicitud a la API incluyendo un token de autenticación.
 * @param {string} endpoint - Endpoint de la API
 * @param {object} data - Datos a enviar en la solicitud
 * @param {string} method - Método de la solicitud (por defecto es 'GET')
 * @returns {Promise<object>} - Respuesta de la API en formato JSON
 */
export const fetchConToken = async (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        const resp = await fetch(url, {
            headers: {
                'x-token': token
            }
        });
        return await resp.json();
    } else {
        const resp = await fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });

        return await resp.json();
    }

}
