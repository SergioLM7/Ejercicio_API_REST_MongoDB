const Provider = require('../models/providers.model');
const Product = require('../models/products.model');

//[GET] http://localhost:3000/api/providers
//Retorna un objeto con los datos de todos los providers o con el del ID pasado por el body. Retorna un status 200. 
//Payload {[{datos_de_provider}, {datos_de_provider}, ...]}
const getAllProviders = async () => {
    return await Provider.find();
};

const getProviderByID = async (id) => {
    return await Provider.findById(id);
};

//[POST] http://localhost:3000/api/providers Se envía en el body los datos del proveedor a crear 
//y retorna un status 201. Payload {message: "proveedor creado", provider:{datos_del_proveedor_creado}}. 
const crearProvider = async (datosProvider) => {
    const provider = new Provider(datosProvider);
    return await provider.save();
};

//[PUT] http://localhost:3000/api/providers Se envía en el body los datos del proveedor a editar y retorna un status 200. 
//Payload {message: "proveedor actualizado: Adidas", provider:{datos_del_proveedor_editado}}.
const actualizarProvider = async (datosProvider) => {
    const updatedProvider = await Provider.findByIdAndUpdate(datosProvider._id, datosProvider, { new: true });
    await Product.updateMany({ provider: updatedProvider._id });
    console.log(updatedProvider);
    return updatedProvider;
};

//[DELETE] http://localhost:3000/api/providers Se envía en el body el título del proveedor a borrar y retorna un status 200. 
//Payload {message: "Se ha borrado el proveedor: Nintendo"}.
const eliminarProvider = async (id) => {
    const providerToEliminate = await Provider.findByIdAndDelete(id);
    await Product.deleteMany({ provider: providerToEliminate._id });
    return providerToEliminate;
};

module.exports = {
    getAllProviders,
    getProviderByID,
    crearProvider,
    actualizarProvider,
    eliminarProvider
};