const { Router } = require("express");
const {
    getAllEmployersHandler,
    getOneEmployersHandler,
    createEmployersHandler,
    updateEmployersHandler,
    deleteEmployersHandler
} = require("../handlers/employersHandler");
const employersRouter = Router();

employersRouter.get("/", getAllEmployersHandler);
employersRouter.get("/:id", getOneEmployersHandler);
employersRouter.post("/", createEmployersHandler);
employersRouter.put("/:id", updateEmployersHandler);
employersRouter.delete("/:id", deleteEmployersHandler);

module.exports = employersRouter;