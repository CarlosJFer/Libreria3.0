const {
    loginController,
    registerController,
  } = require("../controllers/authControllers");
  const Joi = require('joi');
   
  const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/). required(),
    role: Joi.string().valid( 'admin', 'user'),
  });
   
  // Handler para manejar el register
  const registerHandler = async (req, res) => {
    try {
      const { name, username, email, password, role } = req.body;
      const result = await registerController(
        name,
        username,
        email,
        password,
        role
      );
      return res.send(result);
    } catch (err) {
      if (err.message === "Usuario registrado") {
        // Código 409 (conflict) para usuarios ya registrados
        return res.status(409).send('Usuario  registrado');
      }
      res.status(500).send("Ocurrió un error inesperado");
    }
  };
  
  // Handler para manejar el login
  const loginHandler = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const response = await loginController(email, password);
      res.status(200).send(response);
    } catch (err) {
      res.status(401).send({ message: err.message }); 
    }
  };
  
  module.exports = { loginHandler, registerHandler };
  