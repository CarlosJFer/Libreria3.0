const { Router } = require("express");
const {
    getAllRecommendedBooksHandler,
    getOneRecommendedBookHandler,
    createRecommendedBookHandler,
    updateRecommendedBookHandler,
    deleteRecommendedBookHandler
} = require("../handlers/recommendedBooksHandler");
const recommendedBooksRouter = Router();

recommendedBooksRouter.get("/", getAllRecommendedBooksHandler);
recommendedBooksRouter.get("/:id", getOneRecommendedBookHandler);
recommendedBooksRouter.post("/", createRecommendedBookHandler);
recommendedBooksRouter.put("/:id", updateRecommendedBookHandler);
recommendedBooksRouter.delete("/:id", deleteRecommendedBookHandler);

module.exports = recommendedBooksRouter;