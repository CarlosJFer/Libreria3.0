const { Router } = require("express");
const usersRouter = require("./userRoutes");
const productsRouter = require("./productsRoutes");
const employersRouter = require("./employersRoutes");
const receiptsRouter = require("./receiptRoutes");
const ordersRouter = require("./orderRoutes");
const mainRouter = Router();

// Users
mainRouter.use("/users", usersRouter);
// Products
mainRouter.use("/products", productsRouter);
// Order
mainRouter.use("/order", ordersRouter);
// Receipt
mainRouter.use("/receipt", receiptsRouter);
// Employers
mainRouter.use("/employers", employersRouter);

module.exports = mainRouter;
