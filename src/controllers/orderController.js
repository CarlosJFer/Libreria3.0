const Order = require("../models/Order");
const Product = require("../models/Product");

const createOrderController = async (fecha, estado, metodoPago, items) => {
  const mongoose = require('mongoose');
  let total = 0;

  if (!items || !Array.isArray(items)) {
    throw new Error('Los items no son válidos');
  }

  for (const item of items) {
    if (!item.productId || !item.cantidad) {
      throw new Error('El producto no tiene un ID definido o falta cantidad');
    }

    console.log('Item:', item);

    const productId = new mongoose.Types.ObjectId(item.productId);
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error(`El producto con id ${item.productId} no existe en la base de datos`);
    }

    const itemPrice = parseFloat(product.precio.toString()) * item.cantidad;
    item.precio = itemPrice.toFixed(2);
    total += itemPrice;
  }

  const firstProduct = await Product.findById(items[0].productId);
  const downloadUrl = firstProduct ? firstProduct.downloadUrl : '';

  const newOrderData = {
    fecha,
    estado,
    metodoPago,
    items,
    total: total.toFixed(2),
    downloadUrl,
  };

  console.log('New Order Data:', newOrderData);
  console.log('Order:', Order);
  console.log('Order.create:', typeof Order.create);

  if (typeof Order.create !== 'function') {
    throw new Error('Order.create no está definido como una función');
  }

  try {
    const newOrder = await Order.create(newOrderData);
    console.log('Nueva orden creada:', newOrder);
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