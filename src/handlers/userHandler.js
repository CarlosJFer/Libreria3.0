// Middleware de validación de entrada
const validateUserData = (req, res, next) => {
    const { id, name, username, email } = req.body;
    if (!id || !name || !username || !email) {
    return res.status(400).send("Todos los campos son requeridos");
    }
    next();
};

const getAllUsersHandler = (req, res) => {
    try {
    const { name } = req.query;
    if (name) {
        res.send(`Estos son los usuarios con el nombre ${name}`);
    } else {
        res.send("Estos son los usuarios");
    }
    } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    res.status(500).send("Error interno del servidor");
    }
};

const getOneUserHandler = (req, res) => {
    try {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("ID es requerido");
    }
    res.send(`Este es el detalle de un usuario con id ${id}`);
    } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).send("Error interno del servidor");
    }
};

const createUserHandler = (req, res) => {
    try {
    const { id, name, username, email } = req.body;
    console.log(id, name, username, email);
    res.status(201).send(`El usuario con id ${id} y name ${name} fue creado con el username ${username} y su email es ${email}`);
    } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).send("Error interno del servidor");
    }
};

const updateUserHandler = (req, res) => {
    try {
      // Lógica para actualizar el usuario
    res.send("Modificando el usuario");
    } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).send("Error interno del servidor");
    }
};

const deleteUserHandler = (req, res) => {
    try {
      // Lógica para eliminar el usuario
    res.send("Eliminando el usuario");
    } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).send("Error interno del servidor");
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