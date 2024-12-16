const Receipt = require("../models/Receipt");
const Order = require("../models/Order");

const createReceiptController = async (idPedido, detalles) => {
  const order = await Order.findById(idPedido);   // Verificar que la orden exista
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

  const metodoPago = order.metodoPago;   // Obtener el metodoPago desde el pedido

  const total = parseFloat(order.total.toString());  // Calcular el total sumando los subtotales de los ítems

  const newReceipt = await Receipt.create({
    idPedido,
    fechaEmision: new Date(),
    metodoPago,
    total: total.toFixed(2), // Asegurarse de que el total tenga 2 decimales
    detalles,
  });

  return newReceipt;
};

const getAllReceiptsController = async () => {
  return await Receipt.find();
};

const getOneReceiptController = async (id) => {
  const receipt = await Receipt.findById(id);
  if (!receipt) {
    throw new Error(`El recibo con id ${id} no existe en la base de datos`);
  }
  return receipt;
};

//Solo cambia los detalles
const updateReceiptController = async (id, detalles) => {
  const receipt = await Receipt.findById(id);
  if (!receipt) {
    throw new Error(`El recibo con id ${id} no existe en la base de datos`);
  }
  idPedido = receipt.idPedido;
  const newReceipt = { idPedido, detalles };
  const updateReceipt = await Receipt.findByIdAndUpdate(id, newReceipt, {
    new: true,
  });
  return updateReceipt;
};

const deleteReceiptController = async (id) => {
  let deleteReceipt = await Receipt.findByIdAndDelete(id);
  if (!deleteReceipt) {
    throw new Error(`El recibo con id ${id} no existe en la base de datos`);
  }
  return deleteReceipt;
};

module.exports = {
  createReceiptController,
  getAllReceiptsController,
  getOneReceiptController,
  updateReceiptController,
  deleteReceiptController,
};