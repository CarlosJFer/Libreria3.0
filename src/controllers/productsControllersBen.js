const Product = require("../models/Product");

const createProductController = async (
  ISBN,
  titulo,
  autor,
  editorial,
  genero,
  descripcion,
  imgPortada,
  precio
) => {
  const newProduct = Product.create({
    ISBN,
    titulo,
    autor,
    editorial,
    genero,
    descripcion,
    imgPortada,
    precio,
  });
  return newProduct;
};

const getAllProductsController = async () => {
  return await Product.find();
  //.populate({path:"userId", select:"name -_id"})
};

const getProductByIdController = async (id) => {
  return await Product.findById(id);
};

const getProductByTitleController = async (titulo) => {
  const productByTitle = await Product.find({ titulo });
  if (!productByTitle.length) throw new Error("No hay titulos con ese nombre");
  return productByTitle;
};

const updateProductController = async (
  id,
  ISBN,
  titulo,
  autor,
  editorial,
  genero,
  descripcion,
  imgPortada
) => {
  const newProduct = {
    ISBN,
    titulo,
    autor,
    editorial,
    genero,
    descripcion,
    imgPortada,
  };
  const updateProduct = await Product.findByIdAndUpdate(id, newProduct, {
    new: true,
  });
  return updateProduct;
};

const deleteProductController = async (id) => {
  let deleteProduct = await Product.findByIdAndDelete(id);
  return deleteProduct;
};
module.exports = {
  getAllProductsController,
  getProductByTitleController,
  createProductController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
};
