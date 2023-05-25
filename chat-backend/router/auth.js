/*
    Rutas relacionadas con la autenticación de usuarios
    path: api/login
*/
const { Router } = require('express');
const { check }  = require('express-validator');

// Controladores
const { crearUsuario, login, renewToken, logout } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

/**
 * Ruta para crear un nuevo usuario
 * POST /api/login/new
 * Requiere el campo nombre, password y email en el body de la petición
 */
router.post( '/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], crearUsuario );


/**
 * Ruta para el login de usuarios
 * POST /api/login
 * Requiere el campo email y password en el body de la petición
 */
router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login );


/**
 * Ruta para revalidar el token de autenticación
 * GET /api/login/renew
 * Requiere un token de autenticación válido en el header de la petición (x-token)
 */
router.get('/renew', validarJWT, renewToken );

router.post('/logout', validarJWT, logout);

module.exports = router;
