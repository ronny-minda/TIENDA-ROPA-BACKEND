
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT.help');


const loguearse = async(req, res) => {

    const { correo, password } = req.body;

    // verificar correo
    const usuario = await Usuario.findOne({correo});
    if( !usuario ) {
        return res.status(400).json({msg: 'El usuario o contraseña son incorrectos - correo'});
    }

    // verifica el estado este en true(osea no este borrado)
    if( !usuario.estado ) {
        return res.status(400).json({msg: 'El usuario o contraseña son incorrectos - estado = false'});
    }


    // verificar contraseña
    const contra = bcryptjs.compareSync(password, usuario.password);
    if( !contra ) {
        return res.status(400).json({msg: 'El usuario o contraseña son incorrectos - contraseña'});
    }

    const token = await generarJWT( usuario.id );



    res.json({
        usuario,
        token
    })
}

module.exports = loguearse;