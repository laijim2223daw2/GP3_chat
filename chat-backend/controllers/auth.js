const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

/**
 * Crea un nuevo usuario
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {object} - Respuesta JSON indicando el éxito, el usuario creado y el token JWT generado
 */
const crearUsuario = async (req, res = response) => {

    try {

        const { email, password } = req.body;

        // Verificar que el email no exista
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar usuario en BD
        await usuario.save();

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

/**
 * Inicia sesión de usuario
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {object} - Respuesta JSON indicando el éxito, el usuario autenticado y el token JWT generado
 */
const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        // Verificar si existe el correo
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Password no es correcto'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuario: usuarioDB,
            token,
            online: true,
            lastOnline: null
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

/**
 * Renueva el token JWT
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {object} - Respuesta JSON indicando el éxito, el usuario actualizado y el nuevo token JWT generado
 */
const renewToken = async (req, res) => {

    const uid = req.uid;

    // Generar un nuevo JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token,
    })
}

/**
 * Cierra la sesión del usuario y actualiza su última hora en línea
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @returns {object} - Respuesta JSON indicando el éxito
 */
const logout = async(req, res = response) => {

    const uid = req.uid;

    try {
        
        await Usuario.findByIdAndUpdate(uid, { online: false, lastOnline: new Date() });
        
        res.json({
            ok: true,
            msg: 'Logout successful'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    crearUsuario,
    login,
    renewToken,
    logout
}