const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    title: { 
        type: String, 
        required: true,
        unique: true 
    },
    price: { 
        type: Number, 
        required: true,
        min:[0, 'El precio no puede ser negativo']
    },
    description: { 
        type: String, 
        required: true 
    },
    image:{
        type: String,
        validate: {
            validator: (url) => {
                if(url.indexOf('.jpg') != -1 || url.indexOf('.png') != -1)
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Por fa, sólo imágenes JPG o PNG"
        }
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider'
    } //Foreign Key
};
// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Product = mongoose.model('Product', productSchema);

module.exports = Product;


// Insertar un producto

/*const p = new Product({
    title: "Tortilla hola 4",
    price: 5,
    description: "Tortilla jugosa del teatro",
    image:"https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-768x530.jpg",
    provider: '6672ec778da04ed1198f1f1c'
})*/

// Guardar en la BBDD

/*p.save()
.then((data)=>console.log(data))
.catch(err=>console.log(err.message))*/


//Product.find({}).then(data=>console.log(data)); 