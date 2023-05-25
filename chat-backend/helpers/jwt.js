const jwt = require('jsonwebtoken');

/**
 * Genera un JWT (JSON Web Token) con el ID de usuario proporcionado
 * @param {string} uid - ID del usuario
 * @returns {Promise} - Promesa que se resuelve con el JWT generado o se rechaza con un error
 */
const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }

        });
    });

}

/**
 * Comprueba la validez de un JWT y extrae el ID de usuario
 * @param {string} token - JWT a comprobar
 * @returns {Array} - Arreglo con el resultado de la comprobación (booleano) y el ID de usuario (null si no es válido)
 */
const comprobarJWT = (token = '') => {

    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);

        return [true, uid];

    } catch (error) {
        return [false, null];
    }

}

module.exports = {
    generarJWT,
    comprobarJWT
}
