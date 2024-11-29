const Order = require("../models/Order");
const Product = require("../models/Product");
const createOrderController = async (
  idPedido,
  fecha,
  estado,
  metodoPago,
  items
) => {
  let total = 0; // Inicializar el total en 0

  // Iterar sobre los ítems para calcular precios y validar existencia
  for (const item of items) {
    const product = await Product.findById(item.productId); // Buscar el producto en la base de datos
    if (!product) {
      throw new Error(
        `El producto con _id ${item.productId} no existe en la base de datos`
      );
    }

    // Calcular el precio total del ítem: cantidad * precio del producto
    const itemPrice = parseFloat(product.precio.toString()) * item.cantidad;
    item.precio = itemPrice.toFixed(2); // Actualizar el precio del ítem
    total += itemPrice; // Acumular el total de la orden
  }

  // Crear la nueva orden con los precios calculados
  const newOrder = await Order.create({
    idPedido,
    fecha,
    estado,
    metodoPago,
    items,
    total: total.toFixed(2), // Total calculado
  });

  return newOrder;
};

const getAllOrdersController = async () => {
  return await Order.find();
};

const getOrderByIdController = async (id) => {
  const order = await Order.findById(id);
  if (!order) throw new Error("Error: Orden no encontrada");
  return order;
};

const updateOrderController = async (id, userId, productId, quantity) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { userId, productId, quantity },
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
