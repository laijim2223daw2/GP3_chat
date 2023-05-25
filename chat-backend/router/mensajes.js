/*
    Rutas relacionadas con los mensajes
    Path: api/mensajes
*/

const { Router }     = require('express');
const { obtenerChat } = require('../controllers/mensajes');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/**
 * Ruta para obtener el historial de mensajes de un chat
 * GET /api/mensajes/:de
 * Requiere un token de autenticación válido en el header de la petición (x-token)
 * El parámetro :de indica el identificador del usuario del que se desea obtener el historial de mensajes
 */
router.get('/:de', validarJWT, obtenerChat );

module.exports = router;
