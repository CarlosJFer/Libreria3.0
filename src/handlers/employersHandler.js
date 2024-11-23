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

// Crear un nuevo empleado
const createEmployersHandler = (req, res) => {
    const { id, name, username } = req.body;
    if (!id || !name || !username) {
        return res.status(400).send("Todos los campos son requeridos");
    }
    console.log(id, name, username);
    res.status(201).send(`El empleado con id ${id} y name ${name} fue creado con el username ${username}`);
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
    getAllEmployersHandler,
    getOneEmployersHandler,
    createEmployersHandler,
    updateEmployersHandler,
    deleteEmployersHandler,
};