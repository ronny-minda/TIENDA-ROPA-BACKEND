
const express = require('express');
const { todosUsuarios, 
        usuariosId, 
        agregarUsuario, 
        actualizarUsuario, 
        borrarUsuario } = require('../controllers/usuarios.controllers');


const router = express.Router();




router.get('/',[ ] , todosUsuarios);

router.get('/:id',[ ] , usuariosId);

router.post('/',[ ] , agregarUsuario);

router.put('/:id',[ ] , actualizarUsuario);

router.delete('/:id',[ ] , borrarUsuario);





module.exports = router;