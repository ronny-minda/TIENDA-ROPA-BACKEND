
const express = require('express');
const { check } = require('express-validator');

const { existeUsuario, existeEmail } = require('../middlewares/verificarCampos');

const { todosUsuarios, 
        usuariosId, 
        agregarUsuario, 
        actualizarUsuario, 
        borrarUsuario } = require('../controllers/usuarios.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const verificarValores = require('../middlewares/verificarValores');
const verificarRole = require('../middlewares/verificarRole');
const verificarAdmin = require('../middlewares/verificarArmin');
const verificarTecnico = require('../middlewares/verificarTecnico');




const router = express.Router();




router.get('/',[
        verificarJWT,
        verificarRole,
        verificarAdmin
], todosUsuarios);

router.get('/:id',[
        check('id', 'El id no es valido').isMongoId(),
        verificarJWT,
        verificarRole,
        verificarTecnico,
        verificarValores
] , usuariosId);

router.post('/',[
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio o es invalido').isEmail(),
        check('password', 'La contraseña tiene que tener minimo 6 caracteres').isLength({min: 6}),
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        check('correo').custom( existeEmail ),
        verificarJWT,
        verificarRole,
        // verificarAdmin,
        verificarValores // <= aqui caen todos los errores de los check
], agregarUsuario);

router.put('/:id',[
        check('id', 'El id no es valido').isMongoId(),
        // check('correo').custom( existeEmail ),
        check('id').custom( existeUsuario ),
        verificarRole,
        verificarJWT,
        verificarValores
] , actualizarUsuario);

router.delete('/:id',[
        check('id', 'El id no es valido').isMongoId(),
        check('id').custom( existeUsuario ),
        verificarJWT,
        verificarValores
] , borrarUsuario);





module.exports = router;