
const express = require('express');
const loguearse = require('../controllers/auth.controller');

const router = express.Router();


router.post('/login', loguearse);

module.exports = router;