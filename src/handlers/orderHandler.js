const {
    createOrderController,
    getAllOrdersController,
    getOrderByIdController,
    updateOrderController,
    deleteOrderController,
} = require("../controllers/orderController");
const Joi = require('joi');

const orderSchema = Joi.object({
    userId: Joi.string().required(),
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
});

const validateOrderData = (req, res, next) => {
    const { error } = orderSchema.validate(req.body);
    if (error) {
        return res.status(400).send(`Error de validación: ${error.details[0].message}`);
    }
    next();
};

const getAllOrdersHandler = async (req, res) => {
    try {
        const response = await getAllOrdersController();
        res.status(200).send(response);
    } catch (error) {
        console.error("Error al intentar obtener todas las órdenes:", error);
        res.status(500).send({ Error: error.message });
    }
};

const getOneOrderHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await getOrderByIdController(id);
        res.status(200).send(response);
    } catch (error) {
        console.error("Error al obtener la orden:", error);
        res.status(404).send({ Error: error.message });
    }
};

const createOrderHandler = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const response = await createOrderController(userId, productId, quantity);
        res.status(201).send(response);
    } catch (error) {
        console.error("Error al crear la orden:", error);
        res.status(500).send({ Error: error.message });
    }
};

const updateOrderHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, productId, quantity } = req.body;
        const response = await updateOrderController(id, userId, productId, quantity);
        res.status(200).send(response);
    } catch (error) {
        console.error("Error al actualizar la orden:", error);
        res.status(500).send({ Error: error.message });
    }
};

const deleteOrderHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteOrderController(id);
        res.status(200).send(response);
    } catch (error) {
        console.error("Error al eliminar la orden:", error);
        res.status(500).send({ Error: error.message });
    }
};

module.exports = {
    validateOrderData,
    getAllOrdersHandler,
    getOneOrderHandler,
    createOrderHandler,
    updateOrderHandler,
    deleteOrderHandler,
};