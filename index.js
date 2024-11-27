const app = require("./src/app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

//app.listen(PORT, console.log(`Servidor escuchando en el puerto ${PORT}`));

const server = require("./src/app");
const mongoose = require("./src/db/dataBase");
//require("dotenv").config();
async function main(params) {
  try {
    await mongoose.connection;
    console.log("Conexión con la base de datos");
    server.listen(PORT, console.log(`Server listened in por ${PORT}`));
  } catch (error) {
    console.error("Error al conectarnos a la base de datos", error);
  }
}

main();
