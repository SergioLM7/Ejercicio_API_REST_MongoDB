const service = require('../services/products.service');

// CREATE
const createProduct = async (req, res) => {
    console.log(req.body);
    try{
        const data = req.body;
        let answer = await service.crearProducto(data);
        res.status(201).json({message: `Producto creado: ${answer.title}`, answer});

    }catch (error) {
        console.log(`Error creating product: ${error.stack}`);
        res.status(400).json({msj:`Error al crear el producto: ${error.stack}`});
    }
};

 //Primero tendréis que traer los datos del proveedor para obtener el ID_provider. 
 //Después se podrá crear el producto.

// READ
const getProduct = async (req, res) => {
        try {
            const id = req.params.id;
            let products = id? await service.getProductByID(id) : await service.getAllProducts(); //{}
    
            res.status(200).json(products); // Respuesta de la API para 1 producto
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(400).json({msj:`ERROR: ${error.stack}`});
        }
};

// UPDATE
const editProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        let answer = await service.actualizarProducto(id, data, { new: true });
        res.status(200).send({message: `Se ha actualizado el producto: ${answer.title}`, product:answer}); // Respuesta de la API para 1 producto
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
};

// DELETE
const deleteProduct = async (req, res) => {
    try{
        const id = req.params.id;
        let answer = await service.eliminarProducto(id);
        res.status(200).send({message: `Se ha borrado el producto: ${answer.title}`});

    }catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
};

module.exports = {
    createProduct,
    getProduct,
    editProduct,
    deleteProduct
}