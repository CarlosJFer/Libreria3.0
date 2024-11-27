const { query } = require("express");
const {
  getAllProductsController,
  createProductController,
  getProductByIdController,
  getProductByTitleController,
  updateProductController,
  deleteProductController,
} = require("../controllers/productsControllers");

const getAllProductsHandler = async (req, res) => {
  try {
    const response = await getAllProductsController();
    res.send(response);
  } catch (error) {
    res.status(418).send({ Error: error.message });
  }
};

const getOneProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo } = req.query;
    let response;
    if (titulo) {
      response = await getProductByTitleController(titulo);
    } else if (id) {
      response = await getProductByIdController(id);
    }

    res.send(response);
  } catch (error) {
    res.status(418).send({ Error: error.message });
  }
};

const createProductHandler = async (req, res) => {
  try {
    const { ISBN, titulo, autor, editorial, genero, descripcion, imgPortada } =
      req.body;
    const response = await createProductController(
      ISBN,
      titulo,
      autor,
      editorial,
      genero,
      descripcion,
      imgPortada
    );
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const updateProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { ISBN, titulo, autor, editorial, genero, descripcion, imgPortada } =
      req.body;
    const response = await updateProductController(
      id,
      ISBN,
      titulo,
      autor,
      editorial,
      genero,
      descripcion,
      imgPortada
    );
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = deleteProductController(id);
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

module.exports = {
  getAllProductsHandler,
  createProductHandler,
  getOneProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
