const { Schema, model } = require('mongoose');

/**
 * Esquema para el modelo de Usuario en la base de datos
 */
const UsuarioSchema = Schema({

    /**
     * Nombre del usuario
     */
    nombre: {
        type: String,
        required: true
    },

    /**
     * Email del usuario
     */
    email: {
        type: String,
        required: true,
        unique: true
    },

    /**
     * Contraseña del usuario
     */
    password: {
        type: String,
        required: true,
    },

    /**
     * Estado de conexión del usuario
     */
    online: {
        type: Boolean,
        default: false
    }
});

/**
 * Método toJSON para el esquema de Usuario
 * @returns {object} - Objeto de usuario sin los campos __v, _id y password, pero con el campo uid que contiene el valor de _id
 */
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema );
