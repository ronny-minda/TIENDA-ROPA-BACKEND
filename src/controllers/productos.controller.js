
const Producto = require('../models/producto.model');


// get
const todosProductos = async(req, res) => {

    const { desde, hasta } = req.query;

    const total = await Producto.countDocuments();

    const productos = await Producto.find().populate('usuario', 'nombre');
    const filtro = productos.slice( desde, hasta );
    
    console.log(productos);

    res.json({
        total,
        filtro
    });

}

// get
const buscarPorId = (req, res) => {
    
    console.log('desde buscar por ID');
    res.json({msg: 'desde buscar por ID' })

}

//post
const crearProducto = async(req, res) => {

    const { nombre, marca, talla, precio, usuario, cantidad } = req.body;

    const producto = new Producto({ nombre, marca, talla, precio, usuario, cantidad });

    await producto.save();

    res.json({
        msg: 'El producto se a creado'
    })

}

// put
const actualizarProducto = async(req, res) => {

    const { id } = req.params;

    let producto = req.body;

    const usu = await Producto.findById(id);

    // usu.cantidad = usu.cantidad - 1;

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

    valor ? null : valor = 3;

    producto.cantidad = producto.cantidad - valor;

    producto = await Producto.findByIdAndUpdate(id, producto, { new: true });

    // console.log( valor );
    res.json({
        msg: 'desde borrar un Producto',
        producto
    })

}






module.exports = {
    crearProducto,
    todosProductos,
    buscarPorId,
    actualizarProducto,
    borrarProducto
}