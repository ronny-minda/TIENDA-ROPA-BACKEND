
const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    marca: {
        type: String,
        required: [true, 'La marca es requerida']
    },
    talla: {
        type: String,
        required: [true, 'La talla es requerida']
    },
    precio: {
        type: Number,
        default: 0,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
});


module.exports = model('Producto', ProductoSchema);