
const mongoose = require('mongoose');


const dbConection = async() => {

    try {
        
        mongoose.connect(process.env.DATABASE);

        console.log('DB Conectada');

    } catch (error) {
        console.log(error);
        throw new Error('Error, no se conecto la base de datos');
    }

} 

module.exports = dbConection;