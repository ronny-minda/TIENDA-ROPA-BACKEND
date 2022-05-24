
const express = require('express');
const { check } = require('express-validator');
const { crearProducto, todosProductos, buscarPorId, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const verificarRole = require('../middlewares/verificarRole');
const verificarValores = require('../middlewares/verificarValores');

const router = express.Router();


router.get('/', [
    verificarJWT,
    verificarRole
], todosProductos);

router.get('/:id', [
    check('id', 'El id es obligarorio').not().isEmpty(),
    check('id', 'El id es invalido').isMongoId(),
    verificarJWT,
    verificarRole,
    verificarValores
], buscarPorId );

router.post('/',[
    check('nombre', 'El nombre obligatorio').not().isEmpty(),
    check('marca', 'La marca obligatorio').not().isEmpty(),
    check('talla', 'La talla obligatorio').not().isEmpty(),
    check('precio', 'El precio obligatorio').not().isEmpty(),
    check('usuario', 'El ID del usuario que crea el porducto es obligatorio').not().isEmpty(),
    check('cantidad', 'El cantidad de productos a ingresar obligatorio').not().isEmpty(),
    verificarJWT,
    verificarRole,
    verificarValores
], crearProducto);

router.put('/:id',[
    check('id', 'ID invalido').isMongoId(),
    check('nombre', 'El nombre obligatorio').not().isEmpty(),
    check('marca', 'La marca obligatorio').not().isEmpty(),
    check('talla', 'La talla obligatorio').not().isEmpty(),
    check('precio', 'El precio obligatorio').not().isEmpty(),
    check('usuario', 'El ID del usuario que crea el porducto es obligatorio').not().isEmpty(),
    check('cantidad', 'El cantidad de productos a ingresar obligatorio').not().isEmpty(),
    verificarJWT,
    verificarRole,
    verificarValores
], actualizarProducto);

router.put('/', (req, res) => {
    res.status(400).json({msg: 'Falta el ID'})
});

router.delete('/:id',[
    check('id', 'El id es obligarorio').not().isEmpty(),
    check('id', 'ID invalido').isMongoId(),
    verificarJWT,
    verificarRole,
    verificarValores
], borrarProducto);


module.exports = router;