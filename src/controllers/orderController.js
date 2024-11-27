const Order = require("../models/Order");

const createOrderController = async (userId, productId, quantity) => {
    const newOrder = await Order.create({
        userId,
        productId,
        quantity,
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