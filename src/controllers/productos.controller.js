
const Producto = require('../models/producto.model');


// get
const todosProductos = async(req, res) => {

    const { desde, hasta } = req.query;

    const total = await Producto.countDocuments();

    const productos = await Producto.find().populate('usuario', 'nombre');
    const filtro = productos.slice( desde, hasta );
    
    // console.log(productos);

    res.json({
        total,
        filtro
    });

}

// get
const buscarPorId = async(req, res) => {

    const { id } = req.params;

    

    const producto = await Producto.findById(id);

    if( !producto ) {
        return res.status(400).json({msg: 'El productono existe o esta mal el ID'});
    }

    // console.log( producto );
    
    // console.log('desde buscar por ID');
    res.json({
        msg: 'Producto encontrado',
        producto
    });

}

//post
const crearProducto = async(req, res) => {

    const { nombre, marca, talla, precio, usuario, cantidad } = req.body;

    let producto = await Producto.findOne({nombre});

    if( producto ) {
        console.log('no esta');

        return res.status(400).json({msg: 'El producto ya existe'});
    }

    producto = new Producto({ nombre, marca, talla, precio, usuario, cantidad });

    await producto.save();

    res.json({
        msg: 'El producto se a creado',
        producto
    })

}

// put
const actualizarProducto = async(req, res) => {

    const { id } = req.params;

    let producto = req.body;

    const usu = await Producto.findById(id);

    // console.log( usu )

    if( !usu ) {
        console.log('no esta')
        return res.status(400).json({msg: 'El producto no existe o esta mal el id'});
    }

    usu.cantidad = usu.cantidad + producto.cantidad;

    producto = await Producto.findByIdAndUpdate(id, usu, { new: true });

    producto = await Producto.findByIdAndUpdate(id, producto, { new: true });

    // console.log(producto);

    res.json({
        "msg": 'El producto se a actualizado',
        producto
    })
}

// delete
const borrarProducto = async(req, res) => {

    const { id } = req.params;
    let { valor } = req.query;

    let producto = await Producto.findById(id);

    valor ? null : valor = 1;

    producto.cantidad = producto.cantidad + valor;

    producto = await Producto.findByIdAndUpdate(id, producto, { new: true });

    // console.log( valor );
    res.json({
        msg: 'desde borrar un Producto',
        producto
    });

}






module.exports = {
    crearProducto,
    todosProductos,
    buscarPorId,
    actualizarProducto,
    borrarProducto
}




// const { nombre, marca, talla, precio, usuario, cantidad } = req.body;

// let producto = await Producto.findOne({nombre});

// if( !producto ) {
//     console.log('noooooo');
//     producto = new Producto({ nombre, marca, talla, precio, usuario, cantidad });
// }

// if( producto ) {
//     console.log('siiiii');
//     producto.cantidad = producto.cantidad + cantidad;
//     // producto = new Producto({ nombre, marca, talla, precio, usuario, cantidad });
// }

// // console.log(producto);

// await producto.save();

// res.json({
//     msg: 'El producto se a creado'
// })