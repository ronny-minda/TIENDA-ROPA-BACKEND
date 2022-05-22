const { validationResult } = require('express-validator');


const verificarValores = (req, res, next) => {
    const errores = validationResult(req);

    if( !errores.isEmpty() ) {
        return res.status(400).json(errores);
    }

    // console.log(errores);

    next();
}


module.exports = verificarValores;