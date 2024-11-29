const mongoose = require("mongoose");
require("dotenv").config(); // Carga las variables de entorno desde .env

// Obtiene la URL de la base de datos desde el .env
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Aplica métodos para debuggear
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
  console.log("Se ha conectado a MongoDB");
});

module.exports = mongoose;
