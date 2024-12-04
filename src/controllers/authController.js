const users = require("../db/dataBase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controlador para registrarse
const registerController = async (name, username, email, password, role = 'user') => {
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    throw new Error("Usuario  registrado");
  }
  const id = users.length + 1;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id, name, username, email, password: hashedPassword, role };
  users.push(newUser);
  return newUser;
};

// Controlador para iniciar sesión (login)
const loginController = async (email, password) => {
  // Buscar si el usuario con el email proporcionado existe en el arreglo de users
  const user = users.find((user) => user.email === email);
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  // Comparar la contraseña recibida sin hashear con la contraseña hasheada almacenada
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Contraseña incorrecta");
  }
  // Crear un token JWT con el id del usuario y el rol
 
    const payload = {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    };
 
  const token = jwt.sign
    (payload, "mi_clave_secreta", // Debes tener una clave secreta segura
    { expiresIn: "1h", }
  );
  console.log(token);
  // Eliminar la contraseña antes de devolver la respuesta
  const { password: _, ...userWithoutPassword } = user;
  // Si todo coincide, retornar el usuario
  return {
    message: "Inicio de sesión exitoso",
    token, // Devolver el token en la respuesta
    user: userWithoutPassword,
  };
};

module.exports = { loginController, registerController };
