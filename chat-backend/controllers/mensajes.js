const Mensaje = require('../models/mensaje');

/**
 * Obtiene el historial de mensajes de un chat
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {object} - Respuesta JSON indicando el éxito y los últimos 30 mensajes del chat
 */
const obtenerChat = async (req, res) => {

    const miId = req.uid;
    const mensajesDe = req.params.de;

    const last30 = await Mensaje.find({
        $or: [
            { de: miId, para: mensajesDe },
            { de: mensajesDe, para: miId },
        ]
    })
        .sort({ createdAt: 'asc' })
        .limit(30);

    res.json({
        ok: true,
        mensajes: last30
    });

}

module.exports = {
    obtenerChat
}
