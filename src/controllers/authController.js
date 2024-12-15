const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (name, username, email, password, role = 'user') => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('Usuario ya registrado con este email');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, username, email, password: hashedPassword, role });
  await newUser.save();  // Asegúrate de esperar a que se guarde el nuevo usuario
  return newUser;
};

const loginController = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Usuario no está registrado');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign({ id: user.id, role: user.role }, "my_secret_key", { expiresIn: "1h" });

  const { password: _, ...userWithoutPassword } = user.toObject();  // Usa toObject() para obtener un objeto plano sin métodos de mongoose

  return {
    message: "Inicio de sesión exitoso",
    token,
    user: userWithoutPassword,
  };
};

module.exports = { loginController, registerController };
