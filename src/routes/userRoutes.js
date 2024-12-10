const { Router } = require("express");
const {
    getAllUsersHandler,
    getOneUserHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    validateUserData,
} = require("../handlers/userHandler");

const verifyToken = require("../middleware/verifyMiddleware");
const authorizeAdmin = require("../middleware/authMiddleware");
const usersRouter = Router();

usersRouter.get("/", getAllUsersHandler);
usersRouter.get("/:id", getOneUserHandler);
usersRouter.post("/", verifyToken, authorizeAdmin, createUserHandler);
usersRouter.put("/:id",verifyToken, authorizeAdmin, updateUserHandler);
usersRouter.delete("/:id", verifyToken, authorizeAdmin, deleteUserHandler); 

module.exports = usersRouter;