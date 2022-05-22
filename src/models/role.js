

const { model, Schema } = require('mongoose');


const RoleSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'es requerido el nombre del ROL']
    }
});

module.exports = model('Role', RoleSchema);