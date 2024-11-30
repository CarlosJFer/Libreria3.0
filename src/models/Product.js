const { string, required } = require("joi");
const mongoose = require("mongoose");
//Primero creamos el esquema y luego el modelo en si
//Esquema
/*const productShema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String },
  brand: { type: String, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  material: { type: String, required: true },
});*/
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

//Modelo
const Product = mongoose.model("Product", productShema);

module.exports = Product;
