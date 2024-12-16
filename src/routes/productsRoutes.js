const { Router } = require("express");
const {
  getAllProductsHandler,
  getOneProductHandler,
  updateProductHandler,
  deleteProductHandler,
} = require("../handlers/productHandler");
const { createProductHandler } = require("../handlers/productHandler");
const productsRouter = Router();

productsRouter.get("/", getAllProductsHandler);
productsRouter.get("/:id", getOneProductHandler);
productsRouter.post("/", createProductHandler);
productsRouter.put("/:id", updateProductHandler);
productsRouter.delete("/:id", deleteProductHandler);

module.exports = productsRouter;