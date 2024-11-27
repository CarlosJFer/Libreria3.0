const { Router } = require("express");
const {
    getAllProductsHandler,
    getOneProductHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
    validateProductData
} = require("../handlers/productsHandler");
const productsRouter = Router();

productsRouter.get("/", getAllProductsHandler);
productsRouter.get("/:id", getOneProductHandler);
productsRouter.post("/", validateProductData ,createProductHandler);
productsRouter.put("/:id", updateProductHandler);
productsRouter.delete("/:id", deleteProductHandler);

module.exports = productsRouter;