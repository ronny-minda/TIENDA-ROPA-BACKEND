require('dotenv').config();

const express = require('express');
const dbConection = require('./database/config');



const main = () => {

    dbConection();

    const app = express();

    // Habilitar el uso de json
    app.use( express.json() )

    const PORT = process.env.PORT || 3000;


    // Rutas
    app.use('/api/auth/', require('./routers/auth.router'));
    app.use('/api/usuario/', require('./routers/usuario.router'));
    app.use('/api/productos/', require('./routers/productos.router'));
    app.use('/api/comprar/', require('./routers/comprar.router'));




    app.listen(PORT, () => {
        console.log(`Server on port ${ PORT }`);
    });

}

module.exports = main;