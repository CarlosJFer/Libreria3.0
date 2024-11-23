const { Router } = require("express");
const {
    getAllClientsHandler,
    getOneClientHandler,
    createClientHandler,
    updateClientHandler,
    deleteClientHandler
} = require("../handlers/clientsHandler");
const clientsRouter = Router();

clientsRouter.get("/", getAllClientsHandler);
clientsRouter.get("/:id", getOneClientHandler);
clientsRouter.post("/", createClientHandler);
clientsRouter.put("/:id", updateClientHandler);
clientsRouter.delete("/:id", deleteClientHandler);

module.exports = clientsRouter;