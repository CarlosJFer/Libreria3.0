const { Router } = require("express");
const {
    getAllUsersHandler,
    getOneUserHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
    validateUserData,
} = require("../handlers/userHandler");
//se agrega rutas a los middlewares
const verifyToken = require("../middleware/authMiddleware");//se agrega rutas a los middlewares
const authorizeAdmin = require("../middleware/authAdmin");
const usersRouter = Router();

usersRouter.get("/", getAllUsersHandler);
usersRouter.get("/:id", getOneUserHandler);
usersRouter.post("/", validateUserData, verifyToken, authorizeAdmin, createUserHandler); //se agrega middleware "verifyToken, authorizeAdmin"
usersRouter.put("/:id",verifyToken, authorizeAdmin, updateUserHandler);//se agrega middleware "verifyToken, authorizeAdmin"
usersRouter.delete("/:id", verifyToken, authorizeAdmin, deleteUserHandler); //se agrega middleware "verifyToken, authorizeAdmin"

module.exports = usersRouter;