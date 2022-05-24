
const express = require('express');
const { check } = require('express-validator');
const comprar = require('../controllers/comprar.controller');
const verificarJWT = require('../middlewares/verificarJWT');
const verificarRole = require('../middlewares/verificarRole');
const verificarValores = require('../middlewares/verificarValores');

const router = express.Router();

router.post('/', [
    verificarJWT,
    verificarRole,
], comprar);





module.exports = router;