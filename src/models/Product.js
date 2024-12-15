const { string, required } = require("joi");
const mongoose = require("mongoose");

const productShema = new mongoose.Schema({
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
  urlLibro: { type: String, required: true }, // Campo nuevo para la URL del libro
  downloadUrl: { type: String }
});

const Product = mongoose.model("Product", productShema);

module.exports = Product;
