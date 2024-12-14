const app = require("./src/app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// Configuración de conexión a MongoDB
const dbUri = process.env.MONGO_URL;

mongoose.connect(dbUri).then(() => {
  console.log("Conexión con la base de datos");
  app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
  });
}).catch((error) => {
  console.error('Error al conectarnos a la base de datos', error);
});