const { Router } = require("express");
const {
    getAllBestSellersHandler,
    getOneBestSellerHandler,
    createBestSellerHandler,
    updateBestSellerHandler,
    deleteBestSellerHandler
} = require("../handlers/bestSellersHandler");
const bestSellersRouter = Router();

bestSellersRouter.get("/", getAllBestSellersHandler);
bestSellersRouter.get("/:id", getOneBestSellerHandler);
bestSellersRouter.post("/", createBestSellerHandler);
bestSellersRouter.put("/:id", updateBestSellerHandler);
bestSellersRouter.delete("/:id", deleteBestSellerHandler);

module.exports = bestSellersRouter;