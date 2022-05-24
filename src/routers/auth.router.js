
const express = require('express');
const { check } = require('express-validator');
const loguearse = require('../controllers/auth.controller');
const crearUsuario = require('../controllers/crearUsuario');
const { existeEmail } = require('../middlewares/verificarCampos');
const verificarValores = require('../middlewares/verificarValores');

const router = express.Router();


router.post('/login', loguearse);

router.post('/crear',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio o es invalido').isEmail(),
    check('password', 'La contraseña tiene que tener minimo 6 caracteres').isLength({min: 6}),
    check('correo').custom( existeEmail ),
    verificarValores
], crearUsuario);

module.exports = router;