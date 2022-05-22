const usuarioModel = require("../models/usuario.model");
const jwt = require('jsonwebtoken');


const verificarAdmin = async(req, res, next) => {

    const token  = req.header('x-token');

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await usuarioModel.findById(uid);

    // console.log(usuario.rol);

    if( !(usuario.rol === 'ADMIN_ROLE') ) {
        // console.log('erroroooooo');
        return res.json({msg: 'Solo el administrador puede hacer esta accion'})
    }

    next();
}

module.exports = verificarAdmin;