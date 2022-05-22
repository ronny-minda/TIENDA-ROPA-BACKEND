
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT.help');

// const { findByIdAndDelete, findByIdAndUpdate } = require('../models/usuario.model');



const todosUsuarios = async(req, res) => {


    //Debuelve el total de usuarios
    const total = await Usuario.countDocuments({estado: true});

    //Debuelve todos los usuarios
    const usuarios = await Usuario.find({estado: true});

    res.json({
        total,
        usuarios
    })
}

const usuariosId = async(req, res) => {
    const { id } = req.params;

    // buscar por id
    const usuario = await Usuario.findById(id);

    // console.log(id);
    res.json({
        usuario
    });
}

const agregarUsuario = async(req, res) => {

    const { nombre, correo, password, rol, estado } = req.body;

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

const actualizarUsuario = async(req, res) => {

    const { id } = req.params;


    const usu = req.body;

    console.log(usu);

    const { password } = usu;

    if(password) {
        const salt =bcryptjs.genSaltSync();
        usu.password = bcryptjs.hashSync(password, salt);
    }


    const usuario = await Usuario.findByIdAndUpdate(id, usu, { new: true });

    res.json({
        msg: 'El usuario se a actualizado',
        usuario
    });
}

const borrarUsuario = async(req, res) => {

    const { id } = req.params;

    
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}, {new: true});

    // console.log(req.body);


    res.json({
        msg: 'El usuario se a borrado',
        usuario
    });
}



module.exports = {
    todosUsuarios,
    usuariosId,
    agregarUsuario,
    actualizarUsuario,
    borrarUsuario
};