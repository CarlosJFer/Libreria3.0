const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  ISBN: {
    type: String,
    required: true,
  },
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editorial: { type: String },
  genero: { type: String, required: true },
  descripcion: { type: String },
  imgPortada: { type: String },
  precio: { type: Number, required: true },
  urlLibro: { type: String, required: true }, // Asegúrate de que sea requerido
  downloadUrl: { type: String } // Campo para la URL de descarga
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;