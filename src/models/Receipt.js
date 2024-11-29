const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
  idPedido: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  fechaEmision: { type: Date, required: true },
  metodoPago: { type: String, required: true },
  total: { type: mongoose.Schema.Types.Decimal128, required: true },
  detalles: { type: String }, // Detalles adicionales si los hay
});

const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
