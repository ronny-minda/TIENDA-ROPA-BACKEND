const usuarioModel = require("../models/usuario.model");
const jwt = require('jsonwebtoken');


const verificarTecnico = async(req, res, next) => {

    const token  = req.header('x-token');

    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await usuarioModel.findById(uid);

    console.log(usuario.rol);

    let si = false;

    if( usuario.rol === 'ADMIN_ROLE' || usuario.rol === 'TECNICO_ROLE') {
        si = true;
    }

    if( !si ) {

        return res.json({msg: 'Solo el administrador o los tecnicos puede hacer esta accion'})
    }

    next();
}



module.exports = verificarTecnico;