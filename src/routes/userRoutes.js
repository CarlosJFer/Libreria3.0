const { Router } = require("express");
const {
    getAllUsersHandler,
    getOneUserHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    validateUserData,
} = require("../handlers/userHandler");
const usersRouter = Router();

usersRouter.get("/", getAllUsersHandler);
usersRouter.get("/:id", getOneUserHandler);
usersRouter.post("/", validateUserData, createUserHandler);
usersRouter.put("/:id", updateUserHandler);
usersRouter.delete("/:id", deleteUserHandler);

module.exports = usersRouter;