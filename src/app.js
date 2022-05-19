require('dotenv').config();

const express = require('express');
const dbConection = require('./database/config');



const main = () => {

    dbConection();

    const app = express();

    // Habilitar el uso de json
    app.use( express.json() )

    const PORT = process.env.PORT || 3000;



    app.use('/api/usuario/', require('./routers/usuario.router'));




    app.listen(PORT, () => {
        console.log(`Server on port ${ PORT }`);
    });

}

module.exports = main;