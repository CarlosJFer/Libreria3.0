const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrderController = async (userId, fecha, estado, metodoPago, items) => {
  const mongoose = require('mongoose');
  let total = 0;
  const downloadUrls = [];

  if (!items || !Array.isArray(items)) {
    throw new Error('Los items no son válidos');
  }

  for (const item of items) {
    if (!item.productId || !item.cantidad) {
      throw new Error('El producto no tiene un ID definido o falta cantidad');
    }

    const productId = new mongoose.Types.ObjectId(item.productId);
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error(`El producto con id ${item.productId} no existe en la base de datos`);
    }

    const itemPrice = parseFloat(product.precio.toString()) * item.cantidad;
    item.precio = itemPrice.toFixed(2);
    total += itemPrice;

    if (product.downloadUrl) {
      downloadUrls.push(product.downloadUrl);
    } else {
      console.warn(`El producto con id ${item.productId} no tiene una URL de descarga`);
    }
  }

  const newOrderData = {
    userId,
    fecha,
    estado,
    metodoPago,
    items,
    total: total.toFixed(2),
    downloadUrls, // Aquí debería estar la lista de URLs de descarga
  };

  try {
    const newOrder = await Order.create(newOrderData);
    console.log('Nueva orden creada:', newOrder); // Verificar que la orden se crea correctamente
    return newOrder;
  } catch (error) {
    console.error('Error al crear la orden:', error);
    throw error;
  }
};

const getAllOrdersController = async () => {
  return await Order.find();
};

const getOrderByIdController = async (id) => {
  const order = await Order.findById(id);
  if (!order) throw new Error("Error: Orden no encontrada");
  return order;
};

const updateOrderController = async (id, fecha, estado, metodoPago, items) => {
  let total = 0;

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new Error(
        `El producto con id ${item.productId} no existe en la base de datos`
      );
    }

    const itemPrice = parseFloat(product.precio.toString()) * item.cantidad;
    item.precio = itemPrice.toFixed(2);
    total += itemPrice;
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { fecha, estado, metodoPago, items, total },
    { new: true }
  );
  if (!updatedOrder) throw new Error("Error: Orden no encontrada");
  return updatedOrder;
};

const deleteOrderController = async (id) => {
  const deletedOrder = await Order.findByIdAndDelete(id);
  if (!deletedOrder) throw new Error("Error: Orden no encontrada");
  return deletedOrder;
};

module.exports = {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController,
};