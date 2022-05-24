
const bcryptjs = require('bcryptjs');
const generarJWT = require('../helpers/generarJWT.help');
const Usuario = require('../models/usuario.model');


const crearUsuario = async(req, res) => {

    const { nombre, correo, password, rol = 'USER_ROLE', estado = true } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol, estado});


    
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save();

    const token = await generarJWT( usuario._id );

    // console.log(usuario);

    res.json({
        msg: 'Usuario creado',
        usuario,
        token
    });
}


module.exports = crearUsuario;