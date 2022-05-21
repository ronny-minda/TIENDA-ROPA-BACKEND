
const express = require('express');
const { check } = require('express-validator');

const { existeUsuario } = require('../middlewares/verificarCampos');

const { todosUsuarios, 
        usuariosId, 
        agregarUsuario, 
        actualizarUsuario, 
        borrarUsuario } = require('../controllers/usuarios.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const validarValores = require('../middlewares/verificarValores');



const router = express.Router();




router.get('/',[
        verificarJWT
], todosUsuarios);

router.get('/:id',[
        check('id', 'El id no es valido').isMongoId()
] , usuariosId);

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio o es invalido').isEmail(),
        check('password', 'La contraseña tiene que tener minimo 6 caracteres').isLength({min: 6}),
        validarValores
] , agregarUsuario);

router.put('/:id',[
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom( existeUsuario ),
        verificarJWT,
        validarValores
] , actualizarUsuario);

router.delete('/:id',[
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom( existeUsuario ),
        verificarJWT,
        validarValores
] , borrarUsuario);





module.exports = router;