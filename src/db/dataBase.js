const mongoose = require("mongoose");
const mongoUrl =
  "mongodb+srv://benja248myn:Talentos2024@clustertest.hn4b5.mongodb.net/ecommerceDB";

mongoose.connect(mongoUrl);

const db = mongoose.connection; //instanciamos nuestra base de datos

//aplicamos metodos para debuggear

//Verifica los cambios y mmuestra si existe error
db.on("error", console.error.bind(console, "Connection error: "));

db.once("open", () => {
  console.log("Se ha conectado a MongoDB");
});

module.exports = mongoose;
