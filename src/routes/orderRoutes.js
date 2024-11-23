const { Router } = require("express");
const {
    getAllOrdersHandler,
    getOneOrderHandler,
    createOrderHandler,
    updateOrderHandler,
    deleteOrderHandler
} = require("../handlers/orderHandler");
const ordersRouter = Router();

ordersRouter.get("/", getAllOrdersHandler);
ordersRouter.get("/:id", getOneOrderHandler);
ordersRouter.post("/", createOrderHandler);
ordersRouter.put("/:id", updateOrderHandler);
ordersRouter.delete("/:id", deleteOrderHandler);

module.exports = ordersRouter;