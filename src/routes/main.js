const {Router} = require("express");
const usersRouter = require("./userRoutes");
const productsRouter = require("./productsRoutes");
const employersRouter = require("./employersRoutes");
const clientsRouter = require("./clientsRoutes");
const receiptsRouter = require("./receiptRoutes");
const ordersRouter = require("./orderRoutes");
const recommendedBooksRouter = require("./recommendedBooksRoutes");
const forumRouter = require("./forumRoutes");
const bestSellersRouter = require("./bestsellersRoutes");
const mainRouter = Router();

// Users
mainRouter.use("/users", usersRouter);
// Products
mainRouter.use("/products", productsRouter);
// Order
mainRouter.use("/order", ordersRouter);
// Receipt
mainRouter.use("/receipt", receiptsRouter);
// Clients
mainRouter.use("/clients", clientsRouter);
// Employers
mainRouter.use("/employers", employersRouter);
// recommendedBooks
mainRouter.use("/recommendedBooks", recommendedBooksRouter);
// Forum
mainRouter.use("/forum", forumRouter);
// Best Sellers
mainRouter.use("/bestSellers", bestSellersRouter);

module.exports = mainRouter;