const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUserController = async (name, username, email, password, role) => {
try {
    // Verificar si el usuario o el email ya existen en la base de datos
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
    throw new Error('El nombre de usuario o el email ya están en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, email, password: hashedPassword, role });
    await newUser.save();
    return newUser;
} catch (error) {
    if (error.code === 11000) {
    throw new Error('El nombre de usuario o el email ya están en uso');
    }
    throw error;  // Relanzar cualquier otro error que ocurra
}
};

const getAllUsersController = async () => {
    if (!User.length) {
        throw new Error("Error No hay usuarios");
    }
    return await User.find();
};

const getUserByNameController = async (name) => {
    const usersByName = await User.find({name});
    if (!usersByName.length) {
        throw new Error("Error no se encontro el usuario");
    }
    return usersByName;
};

const getUserByIdController = async (id) => {
    const userById = await User.findById(id);
    if (!userById) { throw new Error(`Usuario con ID ${id} no encontrado.`);
    
}
return userById
};

const updateUserController = async (id, name, username, email) => {
    const newUserUpdate = { name, username, email };
    const userUpdateById = await User.findOneAndUpdate({ _id: id}, newUserUpdate, {new: true});
    if (!userUpdateById) {
        throw new Error('Usuario no encontrado');
    }
    return userUpdateById;
};

const deleteUserController = async (id) => {
    const deleteUser = await User.findByIdAndDelete(id);
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