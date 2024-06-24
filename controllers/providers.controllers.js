const service = require('../services/providers.service');

// READ
const getProvider = async (req, res) => {
    try {
        const id = req.params.id;
        let provider = id? await service.getProviderByID(id) : await service.getAllProviders(); //{}

        res.status(200).json([provider]); // Respuesta de la API para 1 producto
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
};

// CREATE
const createProvider = async (req, res) => {
    console.log(req.body);

    try{
        const data = req.body;
        let answer = await service.crearProvider(data);
        res.status(201).json({message: "Proveedor creado", provider: answer});

    }catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
};

// UPDATE
const editProvider = async (req, res) => {
    try {
       // const id = req.params.id;
        const data = req.body;
        let answer = await service.actualizarProvider(data, { new: true });
        res.status(200).send({message: "Proveedor actualizado: "+answer.company_name, provider: answer}); // Respuesta de la API para 1 producto
    }
    catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
};


// DELETE
const deleteProvider = async (req, res) => {
    try{
        const id = req.params.id;
        let answer = await service.eliminarProvider(id);
        res.status(200).send({message: "Se ha borrado el proveedor"});

    }catch (error) {
        console.log(`ERROR: ${error.stack}`);
        res.status(400).json({msj:`ERROR: ${error.stack}`});
    }
};

module.exports = {
    createProvider,
    getProvider,
    editProvider,
    deleteProvider
};