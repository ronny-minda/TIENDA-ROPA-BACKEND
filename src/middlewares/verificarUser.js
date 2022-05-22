const usuarioModel = require("../models/usuario.model");
const jwt = require('jsonwebtoken');


const verificarUsuarios = async(req, res, next) => {

    const token  = req.header('x-token');

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await usuarioModel.findById(uid);

    // console.log(usuario.rol);

    if( !(usuario.rol === 'USER_ROLE') ) {
        // console.log('erroroooooo');
        return res.json({msg: 'Solo los usuarios pueden hacer esta accion'})
    }

    next();
}

module.exports = verificarUsuarios;