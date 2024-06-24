const Product = require('../models/products.model');
const Provider = require('../models/providers.model');

//[GET] http://localhost:3000/api/products Retorna un objeto con los datos de todos los productos. 
//Retorna status 200. 
const getAllProducts = async () => {
    return await Product.find().populate('provider', '-_id -__v');
};

const getProductByID = async (id) => {
    return await Product.findById(id).populate('provider', '-_id -__v');
};

//[POST] http://localhost:3000/api/products Se envía en el body los datos del producto a crear
// retorna status 201. 
const crearProducto = async (datosProduct) => {
    try {
        const provider = await Provider.findOne({ company_name:datosProduct.provider })
        console.log(provider)
        if (provider) {
            const product = new Product({
                title: datosProduct.title, 
                price: datosProduct.price,
                description: datosProduct.description,
                image:datosProduct.image,
                provider: provider._id
            });
            return await product.save();
        } else {
            console.log(`La compañía ${datosProduct.provider} no existe.`)
        }
    } catch (error) {
        console.log('Error creating product:', error);
    }
};

//[PUT] http://localhost:3000/api/products Se envía en el body los datos del producto a actualizar
// retorna status 201. 
const actualizarProducto = async (id, datosProducto) => {
    return await Product.findByIdAndUpdate(id, datosProducto, { new: true });
};

const eliminarProducto = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    getAllProducts,
    getProductByID,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};