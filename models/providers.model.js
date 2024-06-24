const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

const objectSchema = {
    company_name: { 
        type: String, 
        required: true,
        unique: true 
    },
    CIF: { 
        type: String, 
        required: true,
        unique: true,
        validate: {
            validator: (cif) => {
                const regexp = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
                if(regexp.test(cif))
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Formato de CIF incorrecto."
        }
    },
    address: {
        type: String, 
        required: true,
    }, 
    url_web: { 
        type: String, 
        required: true,
        validate: {
            validator: (url) => {
                const regexp = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
                if(regexp.test(url))
                    return true;
                else {
                    return false;
                }
            }, 
            message: "Formato de URL incorrecto."
        }
    }
};
// Crear el esquema
const providerSchema = mongoose.Schema(objectSchema);

// Crear el modelo --> Colección
const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;

//PRUEBA

/*const provider1 = new Provider ({
    company_name: "Teatro Bodevil",
    CIF: "B40236881",
    address: "Calle de Alcalá 23",
    url_web:"http://www.teatrobodevil.com"
});

provider1.save()
.then((data)=>console.log(data))
.catch(err=>console.log(err.message))

//Product.find({}).then(data=>console.log(data)); */
