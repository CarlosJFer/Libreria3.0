// Obtener todas las órdenes
const getAllOrdersHandler = (req, res) => {
    const { name } = req.query;
    if (name) {
        res.send(`Estos son los usuarios con el nombre ${name}`);
    } else {
        res.send("Estos son los usuarios");
    }
};

// Obtener una orden por ID
const getOneOrderHandler = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("El ID es requerido");
    }
    res.send(`Este es el detalle de un usuario con id ${id}`);
};

// Crear una nueva orden
const createOrderHandler = (req, res) => {
    const { id, name, username, email } = req.body;
    if (!id || !name || !username || !email) {
        return res.status(400).send("Todos los campos son requeridos");
    }
    console.log(id, name, username, email);
    res.status(201).send(`El usuario con id ${id} y name ${name} fue creado con el username ${username} y su email es ${email}`);
};

// Actualizar una orden
const updateOrderHandler = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("ID es requerido para actualizar");
    }
    // Lógica para actualizar la orden
    res.send("Modificando el usuario");
};

// Eliminar una orden
const deleteOrderHandler = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("ID es requerido para eliminar");
    }
    // Lógica para eliminar la orden
    res.send("Eliminando el usuario");
};

module.exports = {
    getAllOrdersHandler,
    getOneOrderHandler,
    createOrderHandler,
    updateOrderHandler,
    deleteOrderHandler,
};