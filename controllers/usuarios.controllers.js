
const Usuario = require('../models/usuario.model');
const bcryptjs = require('bcryptjs');
const { findByIdAndDelete, findByIdAndUpdate } = require('../models/usuario.model');



const todosUsuarios = async(req, res) => {

    //Debuelve el total de usuarios
    const total = await Usuario.countDocuments();

    //Debuelve todos los usuarios
    const usuarios = await Usuario.find();

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

    res.json(usuario);
}

const actualizarUsuario = async(req, res) => {

    const { id } = req.params;

    const usu = req.body;

    const { password } = req.body;

    if(password) {
        
        const salt =bcryptjs.genSaltSync();
        usu.password = bcryptjs.hashSync(password, salt);

    }
    // const usu = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, usu);

    // console.log(req.body);
    res.json(usuario);
}

const borrarUsuario = async(req, res) => {

    const { id } = req.params;

    const usu = req.body;
    usu.estado = false;

    // const usu = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    // console.log(req.body);
    res.json(usuario);

}



module.exports = {
    todosUsuarios,
    usuariosId,
    agregarUsuario,
    actualizarUsuario,
    borrarUsuario
};