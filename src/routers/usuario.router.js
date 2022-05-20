
const express = require('express');
const { todosUsuarios, 
        usuariosId, 
        agregarUsuario, 
        actualizarUsuario, 
        borrarUsuario } = require('../controllers/usuarios.controller');


const router = express.Router();




router.get('/',[ ] , todosUsuarios);

router.get('/:id',[ ] , usuariosId);

router.post('/',[ ] , agregarUsuario);

router.put('/:id',[ ] , actualizarUsuario);

router.delete('/:id',[ ] , borrarUsuario);





module.exports = router;