const { loginController, registerController, } = require("../controllers/authController");
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/). required(),
  role: Joi.string().valid( 'admin', 'user', 'support'),
});

const registerHandler = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, username, email, password, role } = req.body;
    const response = await registerController(name, username, email,password, role);
    res.status(201).send(response);
} catch (error) {
    console.error("Error al crear el usuario:", error);
    const statusCode = error.statusCode || 400;
    res.status(statusCode).send({ Error: error.message });
}
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginController(email, password);
    res.status(200).send(response);
  } catch (err) {
    res.status(401).send({ message: err.message }); 
  }
};

module.exports = { loginHandler, registerHandler };
