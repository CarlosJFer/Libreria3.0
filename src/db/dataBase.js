const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Se ha conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
  });

module.exports = mongoose;
