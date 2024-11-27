const { createUserController,
    getAllUsersController,
    getUserByNameController,
    getUserByIdController,
    updateUserController,
    deleteUserController } = require("../controllers/userController");

const Joi = require('joi');
const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    email: Joi.string().min(5).required().email(),
})

const validateUserData = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) { 
        return res.status(400).send(`Error de validación: ${error.details[0].message}`); //Centralizar el error
    }
    next();
};


const getAllUsersHandler = async (req, res) => {
    try {
        const { name } = req.query;
        let response;

        if (name) {
            response = await getUserByNameController(name);
            if (!response.length) {
                return res.status(404).send({ Error: 'Usuario no encontrado' });
            }
        } else {
            response = await getAllUsersController();
        }

        res.status(200).send(response);
    } catch (error) {
        console.error("Error al intentar obtener todos los usuarios:", error);
        res.status(500).send({ Error: error.message });
    }
};

const getOneUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).send("ID es requerido.");
        }

        const response = await getUserByIdController(id);
        res.status(200).send(response);
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        if (error.message === "Error: Usuario no encontrado") {
            res.status(404).send({ Error: error.message });
        } else {
            res.status(500).send({ Error: error.message });
        }
    }
};

const createUserHandler = async (req, res) => {
    try {
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const { name, username, email } = req.body;
        const response = await createUserController(name, username, email);
        res.status(201).send(response);
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        const statusCode = error.statusCode || 400;
        res.status(statusCode).send({ Error: error.message });
    }
};

const updateUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, email } = req.body;
        const response = await updateUserController(id, name, username, email);
        res.status(200).send(response);
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).send({ Error: error.message });
    }
};


const deleteUserHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await deleteUserController(id);
        res.send(response);
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(400).send({ Error: error.message });
    }
};

module.exports = {
    validateUserData,
    getAllUsersHandler,
    getOneUserHandler,
    createUserHandler,
    updateUserHandler,
    deleteUserHandler,
};