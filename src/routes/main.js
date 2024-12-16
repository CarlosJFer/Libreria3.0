const { Router } = require("express");
const usersRouter = require("./userRoutes");
const productsRouter = require("./productsRoutes");
const employeesRouter = require("./employeesRoutes");
const receiptsRouter = require("./receiptRoutes");
const ordersRouter = require("./orderRoutes");
const authRoutes = require("./authRoutes");
const weePagosRouter = require("./weePagosRoutes");
const mainRouter = Router();

//Auth
mainRouter.use('/auth', authRoutes);
// Users
mainRouter.use("/users", usersRouter);
// Products
mainRouter.use("/products", productsRouter);
// Order
mainRouter.use("/order", ordersRouter);
// Receipt
mainRouter.use("/receipt", receiptsRouter);
// Employees
mainRouter.use("/employees", employeesRouter);
// WeePagos
mainRouter.use("/wee", weePagosRouter);

module.exports = mainRouter;