
const express = require('express');
const { crearProducto, todosProductos, buscarPorId, actualizarProducto, borrarProducto } = require('../controllers/productos.controller');

const router = express.Router();


router.get('/', todosProductos);

router.get('/:id', buscarPorId );

router.post('/', crearProducto);

router.put('/', actualizarProducto);

router.delete('/:id', borrarProducto);


module.exports = router;