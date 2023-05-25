const { Schema, model } = require('mongoose');

/**
 * Esquema de Mongoose para el modelo de Mensaje
 */
const MensajeSchema = Schema({

    de: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

/**
 * Convierte el objeto de documento a un objeto JSON omitiendo el campo __v
 * @returns {object} - Objeto JSON del documento
 */
MensajeSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Mensaje', MensajeSchema );
