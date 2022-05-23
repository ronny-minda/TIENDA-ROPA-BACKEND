
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es oblogatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
    }
});

module.exports = model('Usuario', UsuarioSchema);