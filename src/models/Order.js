const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  cantidad: { type: Number, required: true },
  precio: { type: mongoose.Schema.Types.Decimal128, required: false },
});

const orderSchema = new mongoose.Schema({
  idPedido: { type: Number, required: true },
  fecha: { type: Date, required: true },
  estado: { type: String, required: true, maxlength: 50 },
  metodoPago: {
    type: String,
    required: true,
    enum: ["Tarjeta de Crédito", "Débito", "Transferencia Bancaria"],
  },
  items: { type: [itemSchema], required: true },
  total: { type: mongoose.Schema.Types.Decimal128 },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
