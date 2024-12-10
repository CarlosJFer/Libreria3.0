const app = require("./src/app");
const server = require("./src/app");
const mongoose = require("./src/db/dataBase");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

async function main(params) {
  try {
    await mongoose.connection;
    console.log("Conexión con la base de datos");
    server.listen(PORT, console.log(`Servidor en funcionamiento en el puerto ${PORT}`));
  } catch (error) {
    console.error("Error al conectarnos a la base de datos", error);
  }
}

main();
