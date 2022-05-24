
const Producto = require('../models/producto.model');

const comprar = async(req, res) => {

    // const { id } = req.params;

    const { Compra } = req.body;


    Compra.map( async( articulo ) => {
        const { id, cantidad } = articulo;

        const producto = await Producto.findById(id);


        if( producto.cantidad > 0 ) {

            producto.cantidad = producto.cantidad + cantidad;

            await Producto.findByIdAndUpdate(id, producto);

        }

        // console.log( producto );

    });

    res.json({msg: 'Desde comprar controller'});

}

module.exports = comprar;