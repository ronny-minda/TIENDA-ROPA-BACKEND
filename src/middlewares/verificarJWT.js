
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const verificarJWT = async(req, res, next) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({msg: 'no hay token en la peticion'})
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // return res.json({msg: 'json valido'});

        const usuario = await Usuario.findById(uid);
        // console.log(usuario);

        if (!usuario) {
            return res.status(401).json({msg: 'Token no valido - No existe en la DB'});
        }

        if (!usuario.estado) {
            return res.status(401).json({msg: 'Token no valido - el estado en false'});
        }

        // if (usuario.rol === 'USER_ROLE') {
        //     return res.status(401).json({msg: 'El usuario no tiene permisos'});
        // }


        // req.body = usuario;
        
        next();

    } catch (error) {
        // console.log(error);
        return res.status(401).json({msg: 'el token no es valido'})
    }

    

}

module.exports = verificarJWT;