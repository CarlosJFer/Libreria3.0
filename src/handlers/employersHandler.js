const {
  createEmployerController,
} = require("../controllers/employerController");

// Crear un nuevo empleado
const createEmployerHandler = async (req, res) => {
  try {
    const { firstName, lastName, position, email, phone } = req.body;
    const response = await createEmployerController(
      firstName,
      lastName,
      position,
      email,
      phone
    );
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

// Obtener todos los empleados
const getAllEmployersHandler = (req, res) => {
  const { name } = req.query;
  if (name) {
    res.send(`Estos son los empleados con el nombre ${name}`);
  } else {
    res.send("Estos son los empleados");
  }
};

// Obtener un empleado por ID
const getOneEmployersHandler = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("El ID es requerido");
  }
  res.send(`Este es el empleado con el id ${id}`);
};

// Actualizar un empleado
const updateEmployersHandler = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("ID es requerido para actualizar");
  }
  // Lógica para actualizar el empleado
  res.send("Empleado modificado en el sistema");
};

// Eliminar un empleado
const deleteEmployersHandler = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("ID es requerido para eliminar");
  }
  // Lógica para eliminar el empleado
  res.send("Empleado eliminado del sistema");
};

module.exports = {
  createEmployerHandler,
  getAllEmployersHandler,
  getOneEmployersHandler,
  updateEmployersHandler,
  deleteEmployersHandler,
};
