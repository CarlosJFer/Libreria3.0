// Obtener todos los recibos
const getAllReceiptsHandler = (req, res) => {
    const { name } = req.query;
    if (name) {
        res.send(`Estos son los usuarios con el nombre ${name}`);
    } else {
        res.send("Estos son los usuarios");
    }
};

// Obtener un recibo por ID
const getOneReceiptHandler = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("El ID es requerido");
    }
    res.send(`Este es el detalle de un usuario con id ${id}`);
};

// Crear un nuevo recibo
const createReceiptHandler = (req, res) => {
    const { id, name, username, email } = req.body;
    if (!id || !name || !username || !email) {
        return res.status(400).send("Todos los campos son requeridos");
    }
    console.log(id, name, username, email);
    res.status(201).send(`El usuario con id ${id} y name ${name} fue creado con el username ${username} y su email es ${email}`);
};

// Actualizar un recibo
const updateReceiptHandler = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("ID es requerido para actualizar");
    }
    // Lógica para actualizar el recibo
    res.send("Modificando el usuario");
};

// Eliminar un recibo
const deleteReceiptHandler = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("ID es requerido para eliminar");
    }
    // Lógica para eliminar el recibo
    res.send("Eliminando el usuario");
};

module.exports = {
    getAllReceiptsHandler,
    getOneReceiptHandler,
    createReceiptHandler,
    updateReceiptHandler,
    deleteReceiptHandler,
};