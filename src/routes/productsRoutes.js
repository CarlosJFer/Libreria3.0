const { Router } = require("express");
const {
  getAllProductsHandler,
  getOneProductHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("../handlers/productsHandler");
const { createProductHandler } = require("../handlers/productHandler");
const productsRouter = Router();

// Son distintos createProductsHandler,createProductHandler,

productsRouter.get("/", getAllProductsHandler);
productsRouter.get("/:id", getOneProductHandler);
//productsRouter.post("/", createProductsHandler);
productsRouter.post("/", createProductHandler);
productsRouter.put("/:id", updateProductHandler);
productsRouter.delete("/:id", deleteProductHandler);

module.exports = productsRouter;
