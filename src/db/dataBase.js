const mongoose = require("mongoose");
const mongoUrl = "inserte URL";

mongoose.connect(mongoUrl);

const db = mongoose.connection; //instanciamos nuestra base de datos

//aplicamos metodos para debuggear

//Verifica los cambios y mmuestra si existe error
db.on("error", console.error.bind(console, "Connection error: "));

db.once("open", () => {
  console.log("Se ha conectado a MongoDB");
});

module.exports = mongoose;
