const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

/**
 * Actualiza el estado de conexión de un usuario a "conectado"
 * @param {string} uid - ID del usuario
 * @returns {object} - Objeto del usuario actualizado
 */
const usuarioConectado = async (uid) => {

    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save();

    return usuario;
}

/**
 * Actualiza el estado de conexión de un usuario a "desconectado"
 * @param {string} uid - ID del usuario
 * @returns {object} - Objeto del usuario actualizado
 */
const usuarioDesconectado = async (uid) => {
    const usuario = await Usuario.findById(uid);
    usuario.online = false;
    await usuario.save();

    return usuario;
}

/**
 * Obtiene la lista de usuarios ordenados por estado de conexión (en línea primero)
 * @returns {Array} - Lista de usuarios
 */
const getUsuarios = async () => {

    const usuarios = await Usuario
        .find()
        .sort('-online');

    return usuarios;
}

/**
 * Guarda un mensaje en la base de datos
 * @param {object} payload - Datos del mensaje a guardar
 * @returns {object|boolean} - Objeto del mensaje guardado o `false` si ocurre un error
 */
const grabarMensaje = async (payload) => {

    try {

        const mensaje = new Mensaje(payload);
        await mensaje.save();

        return mensaje;

    } catch (error) {
        console.log(error);
        return false;
    }

}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    grabarMensaje
}
