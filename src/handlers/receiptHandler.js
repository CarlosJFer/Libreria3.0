const Joi = require("joi");
const { createReceiptController } = require("../controllers/receiptController");

const receiptSchema = Joi.object({
  idPedido: Joi.string().required(),
  detalles: Joi.string().optional(),
});
const createReceiptHandler = async (req, res) => {
  const { error } = receiptSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const { idPedido, detalles } = req.body;
    const response = await createReceiptController(idPedido, detalles);
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

// Obtener todos los recibos
const getAllReceiptsHandler = (req, res) => {
  const { name } = req.query;
  if (name) {
    res.send(`Estos son los usuarios con el nombre ${name}`);
  } else {
    res.send("Estos son los usuarios");
  }
};

// Obtener un recibo por ID
const getOneReceiptHandler = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("El ID es requerido");
  }
  res.send(`Este es el detalle de un usuario con id ${id}`);
};

// Actualizar un recibo
const updateReceiptHandler = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("ID es requerido para actualizar");
  }
  // Lógica para actualizar el recibo
  res.send("Modificando el usuario");
};

// Eliminar un recibo
const deleteReceiptHandler = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("ID es requerido para eliminar");
  }
  // Lógica para eliminar el recibo
  res.send("Eliminando el usuario");
};

module.exports = {
  getAllReceiptsHandler,
  getOneReceiptHandler,
  createReceiptHandler,
  updateReceiptHandler,
  deleteReceiptHandler,
};
