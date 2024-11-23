// Obtener todos los best sellers
const getAllBestSellersHandler = (req, res) => {
    try {
        const { name } = req.query;
        if (name) {
            res.send(`Estos son los best sellers con el nombre ${name}`);
        } else {
            res.send("Estos son todos los best sellers");
        }
    } catch (error) {
        console.error("Error al obtener todos los best sellers:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// Obtener un best seller por ID
const getOneBestSellerHandler = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("ID es requerido");
        }
        // Lógica para obtener un best seller por ID
        res.send(`Este es el detalle del best seller con id ${id}`);
    } catch (error) {
        console.error("Error al obtener el best seller:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// Crear un nuevo best seller
const createBestSellerHandler = (req, res) => {
    try {
        const { id, name, username, email } = req.body;
        if (!id || !name || !username || !email) {
            return res.status(400).send("Todos los campos son requeridos");
        }
        console.log(id, name, username, email);
        res.status(201).send(`El best seller con id ${id} y nombre ${name} fue creado con el username ${username} y su email es ${email}`);
    } catch (error) {
        console.error("Error al crear el best seller:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// Actualizar un best seller
const updateBestSellerHandler = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("ID es requerido para actualizar");
        }
        // Lógica para actualizar el best seller
        res.send(`Best seller con ID: ${id} modificado`);
    } catch (error) {
        console.error("Error al actualizar el best seller:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// Eliminar un best seller
const deleteBestSellerHandler = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("ID es requerido para eliminar");
        }
        // Lógica para eliminar el best seller
        res.send(`Best seller con ID: ${id} eliminado`);
    } catch (error) {
        console.error("Error al eliminar el best seller:", error);
        res.status(500).send("Error interno del servidor");
    }
};

module.exports = {
    getAllBestSellersHandler,
    getOneBestSellerHandler,
    createBestSellerHandler,
    updateBestSellerHandler,
    deleteBestSellerHandler,
};