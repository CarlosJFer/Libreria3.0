const Employee = require("../models/Employee");

const createEmployeeController = async (
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

const getAllEmployeesController = async () => {
  return await Employee.find();
};

const getOneEmployeesController = async (id) => {
  return await Employee.findById(id);
};

const updateEmployeesController = async (
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

const deleteEmployeeController = async (id) => {
  let deleteEmployee = await Employee.findByIdAndDelete(id);
  if (!deleteEmployee) {
    throw new Error(`El producto con id ${id} no existe en la base de datos`);
  }
  return deleteEmployee;
};

module.exports = {
  createEmployeeController,
  getAllEmployeesController,
  getOneEmployeesController,
  updateEmployeesController,
  deleteEmployeeController,
};