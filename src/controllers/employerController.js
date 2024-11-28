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

module.exports = { createEmployerController };
