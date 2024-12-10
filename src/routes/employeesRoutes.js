const { Router } = require("express");
const {
  getAllEmployeesHandler,
  getOneEmployeesHandler,
  createEmployeeHandler,
  updateEmployeesHandler,
  deleteEmployeesHandler,
} = require("../handlers/employeesHandler");
const employeesRouter = Router();

employeesRouter.get("/", getAllEmployeesHandler);
employeesRouter.get("/:id", getOneEmployeesHandler);
employeesRouter.post("/", createEmployeeHandler);
employeesRouter.put("/:id", updateEmployeesHandler);
employeesRouter.delete("/:id", deleteEmployeesHandler);

module.exports = employeesRouter;
