const { Router } = require("express");
const {
  getAllProductsHandler,
  getOneProductsHandler,
  createProductsHandler,
  updateProductsHandler,
  deleteProductsHandler,
  validateProductsData,
} = require("../handlers/productsHandler");
const { createProductHandler } = require("../handlers/productHandler");
const productsRouter = Router();

// Son distintos createProductsHandler,createProductHandler,

productsRouter.get("/", getAllProductsHandler);
productsRouter.get("/:id", getOneProductsHandler);
//productsRouter.post("/", createProductsHandler);
productsRouter.post("/", createProductHandler);
productsRouter.put("/:id", updateProductsHandler);
productsRouter.delete("/:id", deleteProductsHandler);

module.exports = productsRouter;
