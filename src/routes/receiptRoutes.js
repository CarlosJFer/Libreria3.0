const { Router } = require("express");
const {
    getAllReceiptsHandler,
    getOneReceiptHandler,
    createReceiptHandler,
    updateReceiptHandler,
    deleteReceiptHandler
} = require("../handlers/receiptHandler");
const receiptsRouter = Router();

receiptsRouter.get("/", getAllReceiptsHandler);
receiptsRouter.get("/:id", getOneReceiptHandler);
receiptsRouter.post("/", createReceiptHandler);
receiptsRouter.put("/:id", updateReceiptHandler);
receiptsRouter.delete("/:id", deleteReceiptHandler);

module.exports = receiptsRouter;