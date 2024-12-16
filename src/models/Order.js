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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fecha: { type: Date },
  estado: {
    type: String,
    enum: ["Pendiente", "Cancelado", "Aceptado"],
    default: "Pendiente",
  },
  metodoPago: {
    type: String,
    required: true,
    enum: ["Tarjeta de Crédito", "Débito", "Transferencia Bancaria"],
  },
  items: { type: [itemSchema], required: true },
  total: { type: mongoose.Schema.Types.Decimal128 },
  downloadUrls: { type: [String] }, // Asegúrate de que downloadUrls sea una lista de strings
});

// Verifica si el modelo ya ha sido registrado
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = Order;