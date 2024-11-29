const Receipt = require("../models/Receipt");
const Order = require("../models/Order");

const createReceiptController = async (idPedido, detalles) => {
  // Verificar que el pedido exista
  const order = await Order.findById(idPedido);
  if (!order) {
    throw new Error(
      `El pedido con id ${idPedido} no existe en la base de datos`
    );
  }
  if (order.estado === "Cancelado") {
    throw new Error(`El pedido con id ${idPedido} fue cancelado`);
  }
  if (order.estado === "Pendiente") {
    throw new Error(`El pedido con id ${idPedido} todavía esta pendiente`);
  }
  // Obtener el metodoPago desde el pedido
  const metodoPago = order.metodoPago;
  // Calcular el total sumando los subtotales de los ítems
  const total = parseFloat(order.total.toString());
  // Crear el recibo
  const newReceipt = await Receipt.create({
    idPedido,
    fechaEmision: new Date(),
    metodoPago,
    total: total.toFixed(2), // Asegurarse de que el total tenga 2 decimales
    detalles,
  });

  return newReceipt;
};

module.exports = { createReceiptController };
