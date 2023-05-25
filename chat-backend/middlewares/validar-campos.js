const { validationResult } = require('express-validator');

/**
 * Middleware que valida los campos de una solicitud utilizando express-validator
 * @param {object} req - Objeto de solicitud
 * @param {object} res - Objeto de respuesta
 * @param {function} next - Función para pasar al siguiente middleware
 */
const validarCampos = (req, res, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();

}

module.exports = {
    validarCampos
}
