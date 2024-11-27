const users = require('../db/dataBase');

const createUserController = async (name, username, email) => {
    if (!name || !username || !email) {
        throw new Error("Error: Faltan datos");
    }

    // Controla si el usuario o email ya existen
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
        const error = new Error("Error: El username o email ya existe");
        error.statusCode = 409;
        throw error;
    }

    const id = users.length + 1;
    const newUser = { id, name, username, email };
    users.push(newUser);
    return newUser;
};

const getAllUsersController = async () => {
    if (!users.length) {
        throw new Error("Error No hay usuarios");
    }
    return users;
};

const getUserByNameController = async (name) => {
    const usersByName = users.filter(user => user.name === name);
    if (!usersByName.length) {
        throw new Error("Error no se encontro el usuario");
    }
    return usersByName;
};

const getUserByIdController = async (id) => {
    const userById = users.find(user => user.id === Number(id));
    if (!userById) {
        throw new Error("Error: Usuario no encontrado");
    }
    return userById;
};

const updateUserController = async (id, name, username, email) => {
    const newUserUpdate = { name, username, email };
    const userUpdateById = users.find(user => user.id === Number(id));

    if (!userUpdateById) {
        throw new Error('Usuario no encontrado');
    }

    Object.assign(userUpdateById, newUserUpdate);
    return userUpdateById;
};

const deleteUserController = async (id) => {
    if (!id || isNaN(Number(id))) {
        throw new Error('ID no valido');
    }

    const index = users.findIndex((user) => user.id === Number(id));

    if (index === -1) {
        throw new Error('Usuario no encontrado');
    }

    const [deleteUser] = users.splice(index, 1);
    return deleteUser;
};

module.exports = {
    createUserController,
    getAllUsersController,
    getUserByNameController,
    getUserByIdController,
    updateUserController,
    deleteUserController
};