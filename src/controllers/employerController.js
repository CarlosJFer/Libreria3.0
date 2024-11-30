const Employee = require("../models/Employee");

const createEmployerController = async (
  firstName,
  lastName,
  position,
  email,
  phone
) => {
  const newEmployee = await Employee.create({
    firstName,
    lastName,
    position,
    email,
    phone,
  });
  return newEmployee;
};

const getAllEmployersController = async () => {
  return await Employee.find();
};

const getOneEmployersController = async (id) => {
  return await Employee.findById(id);
};

const updateEmployersController = async (
  id,
  firstName,
  lastName,
  position,
  email,
  phone
) => {
  const newEmployee = { firstName, lastName, position, email, phone };
  const updateEmployee = await Employee.findByIdAndUpdate(id, newEmployee, {
    new: true,
  });
  if (!updateEmployee) {
    throw new Error(`El empleado con id ${id} no existe en la base de datos`);
  }
  return updateEmployee;
};

const deleteEmployerController = async (id) => {
  let deleteEmployer = await Employee.findByIdAndDelete(id);
  if (!deleteEmployer) {
    throw new Error(`El producto con id ${id} no existe en la base de datos`);
  }
  return deleteEmployer;
};

module.exports = {
  createEmployerController,
  getAllEmployersController,
  getOneEmployersController,
  updateEmployersController,
  deleteEmployerController,
};
