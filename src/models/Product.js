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
});

const Product = mongoose.model("Product", productShema);

module.exports = Product;
