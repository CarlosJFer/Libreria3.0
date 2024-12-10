const {
  createEmployeeController,
  getAllEmployeesController,
  getOneEmployeesController,
  updateEmployeesController,
  deleteEmployeeController,
} = require("../controllers/employeeController");

const createEmployeeHandler = async (req, res) => {
  try {
    const { firstName, lastName, position, email, phone } = req.body;
    const response = await createEmployeeController(
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

const getAllEmployeesHandler = async (req, res) => {
  try {
    const response = await getAllEmployeesController();
    res.send(response);
  } catch (error) {
    res.status(418).send({ Error: error.message });
  }
};

const getOneEmployeesHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send("El ID es requerido");
    }
    const response = await getOneEmployeesController(id);
    res.send(response);
  } catch (error) {
    res.status(500).send({ Error: error.message });
  }
};

const updateEmployeesHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, position, email, phone } = req.body;
    if (!id) {
      return res.status(400).send("ID es requerido para actualizar");
    }
    const response = await updateEmployeesController(
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

const deleteEmployeesHandler = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("ID es requerido para eliminar");
    }
    const response = await deleteEmployeeController(id);
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
  createEmployeeHandler,
  getAllEmployeesHandler,
  getOneEmployeesHandler,
  updateEmployeesHandler,
  deleteEmployeesHandler,
};
