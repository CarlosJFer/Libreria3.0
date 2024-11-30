const {
  createEmployerController,
  getAllEmployersController,
  getOneEmployersController,
  updateEmployersController,
  deleteEmployerController,
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
const getAllEmployersHandler = async (req, res) => {
  try {
    const response = await getAllEmployersController();
    res.send(response);
  } catch (error) {
    res.status(418).send({ Error: error.message });
  }
};

// Obtener un empleado por ID
const getOneEmployersHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("El ID es requerido");
    }
    const response = await getOneEmployersController(id);
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

// Actualizar un empleado
const updateEmployersHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, position, email, phone } = req.body;
    if (!id) {
      return res.status(400).send("ID es requerido para actualizar");
    }
    // Lógica para actualizar el empleado
    const response = await updateEmployersController(
      id,
      firstName,
      lastName,
      position,
      email,
      phone
    );
    res.send("Empleado modificado en el sistema");
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

// Eliminar un empleado
const deleteEmployersHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("ID es requerido para eliminar");
    }
    const response = await deleteEmployerController(id);
    if (!response) {
      return res
        .status(404)
        .send({ error: `El empleado con id ${id} no existe` });
    }
    res.send(response);
    res.send("Empleado eliminado del sistema");
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

module.exports = {
  createEmployerHandler,
  getAllEmployersHandler,
  getOneEmployersHandler,
  updateEmployersHandler,
  deleteEmployersHandler,
};
