
const Usuario = require('../models/usuario.model');

const existeEmail = (req, res, next) => {
    
}

const existeUsuario = async(id) => {
    
    let usuario = null;

    try {
        usuario = await Usuario.findById(id);
    } catch (error) {
        usuario = null;
    }



    if( !usuario ) {
        throw new Error(`El id no existe ${ id }`);
    }

    // try{
    //     const usuario = await Usuario.findById({_id: id});
    //     console.log(usuario);
    // } catch (error) {
    //     throw new Error(`El id no existe ${ id }`);
    // }


    



    // console.log(usuario);

}

module.exports = {
    existeEmail,
    existeUsuario
}