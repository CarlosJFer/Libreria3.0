const mongoose = require("mongoose");

// Esquema para Employee
const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    enum: ["soporte", "administrador"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
});

// Modelo
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
