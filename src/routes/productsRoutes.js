const { Router } = require("express");
const {
    getAllProductsHandler,
    getOneProductsHandler,
    createProductsHandler,
    updateProductsHandler,
    deleteProductsHandler,
    validateProductsData
} = require("../handlers/productsHandler");
const productsRouter = Router();

productsRouter.get("/", getAllProductsHandler);
productsRouter.get("/:id", getOneProductsHandler);
productsRouter.post("/", createProductsHandler, validateProductsData);
productsRouter.put("/:id", updateProductsHandler);
productsRouter.delete("/:id", deleteProductsHandler);

module.exports = productsRouter;