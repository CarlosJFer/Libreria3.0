const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async ( name, username, email, password, role = 'user' ) => {
  // const userExists = users.some((user) => user.email === email);
  // if (userExists) {
  //   throw new Error("Usuario ya registrado");
  // }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User ({ name, username, email, password: hashedPassword, role });
  newUser.save();
  return newUser;
};

const loginController = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Usuario no esta registrado');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password); // Comparar la contraseña recibida sin hashear con la contraseña hasheada almacenada
  if (!isPasswordMatch) {
    throw new Error("Contraseña incorrecta");
  }

  const token = jwt.sign({ id: user.id, role: user.role }, "my_secret_key", {expiresIn: "1h"},);

  const { password: _, ...userWithoutPassword } = user;  // Oculta la contraseña antes de devolver la respuesta

  return {
    message: "Inicio de sesión exitoso",
    token,
    user: userWithoutPassword,
  };
};

module.exports = { loginController, registerController };
