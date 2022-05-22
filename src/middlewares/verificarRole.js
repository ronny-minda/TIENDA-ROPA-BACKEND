
const Usuario = require('../models/usuario.model');
const Role = require('../models/role');
const jwt = require('jsonwebtoken');

const verificarRole = async(req, res, next) => {


    //recuperado el token de quien esta haciendo el pedido
    const token  = req.header('x-token');

    // sacando el is del token 
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //buscando el usuario con el id
    const usuario = await Usuario.findById(uid);

    const valor = await Role.find();

    let si = false;

    for (const obj of valor) {

        if( obj.nombre === usuario.rol ) {

            si = true;

        }

    }

    if( !si ) {
        return res.status(400).json({msg: 'Este rol no es admitido'});
    }

    
    next();

}

module.exports = verificarRole;