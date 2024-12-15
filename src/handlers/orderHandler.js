const {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController,
} = require("../controllers/orderController");
const Joi = require("joi");

const orderSchema = Joi.object({
  fecha: Joi.date(),
  estado: Joi.string().max(50),
  metodoPago: Joi.string()
    .valid("Tarjeta de Crédito", "Débito", "Transferencia Bancaria")
    .required(),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        cantidad: Joi.number().integer().required(),
        precio: Joi.number().precision(2).allow(null), // Puede venir nulo
      })
    )
    .required(),
  total: Joi.number().precision(2).allow(null), // Puede venir nulo
});

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
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    let { fecha, estado, metodoPago, items } = req.body;

    const response = await createOrderController(
      fecha,
      estado,
      metodoPago,
      items
    );
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const updateOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, estado, metodoPago, items } = req.body;
    const response = await updateOrderController(
      id,
      fecha,
      estado,
      metodoPago,
      items
    );
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
  getAllOrdersHandler,
  getOneOrderHandler,
  createOrderHandler,
  updateOrderHandler,
  deleteOrderHandler,
};
