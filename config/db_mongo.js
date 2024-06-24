const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const uri = process.env.MONGODB_URI;

const connectToDatabase = async() => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB Atlas with Mongoose!");
    } catch (err) {
      console.error("Error connecting to MongoDB Atlas:", err);
      process.exit(1);
    }
  }
  
  module.exports = connectToDatabase;

//const db = mongoose.connection;



// Eventos
//db.on("error", error => console.log(error));
//db.once("open", () => console.log("connection to MongoDB established"));

//module.exports = mongoose;

