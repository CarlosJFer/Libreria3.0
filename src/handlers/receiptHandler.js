const Joi = require("joi");
const {
  createReceiptController,
  getAllReceiptsController,
  getOneReceiptController,
  updateReceiptController,
  deleteReceiptController,
} = require("../controllers/receiptController");
const { response } = require("express");

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
const getAllReceiptsHandler = async (req, res) => {
  try {
    const response = await getAllReceiptsController();
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

// Obtener un recibo por ID
const getOneReceiptHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("El ID es requerido");
    }
    const response = await getOneReceiptController(id);
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

// Actualizar un recibo
//se podría actualizar solo detalles
const updateReceiptHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { detalles } = req.body;
    if (!id) {
      return res.status(400).send("ID es requerido para actualizar");
    }
    // Lógica para actualizar el recibo
    const response = await updateReceiptController(id, detalles);
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

// Eliminar un recibo
const deleteReceiptHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("ID es requerido para eliminar");
    }
    // Lógica para eliminar el recibo
    const response = await deleteReceiptController(id);
    if (!response) {
      return res
        .status(404)
        .send({ error: `El recibo con id ${id} no existe` });
    }
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

module.exports = {
  getAllReceiptsHandler,
  getOneReceiptHandler,
  createReceiptHandler,
  updateReceiptHandler,
  deleteReceiptHandler,
};
