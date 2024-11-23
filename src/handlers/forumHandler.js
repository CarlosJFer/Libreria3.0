// Obtener todos los temas del foro
const getAllForumsTopicsHandler = (req, res) => {
    try {
        const { title } = req.query;
        if (title) {
            res.send(`Estos son los temas del foro con el nombre ${title}`);
        } else {
            res.send("Estos son todos los temas del foro");
        }
    } catch (error) {
        console.error("Error al obtener todos los temas del foro:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// Obtener un tema del foro por ID
const getOneForumTopicHandler = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send(" El ID es requerido");
        }
        // Lógica para obtener un tema del foro por ID
        res.send(`Este es el detalle del tema del foro con id ${id}`);
    } catch (error) {
        console.error("Error al obtener el tema del foro:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// Crear un nuevo tema del foro
const createForumTopicHandler = (req, res) => {
    try {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            return res.status(400).send("Título, contenido y autor son requeridos");
        }
        console.log(title, content, author);
        res.status(201).send(`El tema del foro con título "${title}" fue creado por ${author}`);
    } catch (error) {
        console.error("Error al crear el tema del foro:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// Actualizar un tema del foro
const updateForumTopicHandler = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("ID es requerido para actualizar");
        }
        // Lógica para actualizar el tema del foro
        res.send(`Tema del foro con ID: ${id} modificado`);
    } catch (error) {
        console.error("Error al actualizar el tema del foro:", error);
        res.status(500).send("Error interno del servidor");
    }
};

// Eliminar un tema del foro
const deleteForumTopicHandler = (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("ID es requerido para eliminar");
        }
        // Lógica para eliminar el tema del foro
        res.send(`Tema del foro con ID: ${id} eliminado`);
    } catch (error) {
        console.error("Error al eliminar el tema del foro:", error);
        res.status(500).send("Error interno del servidor");
    }
};

module.exports = {
    getAllForumsTopicsHandler,
    getOneForumTopicHandler,
    createForumTopicHandler,
    updateForumTopicHandler,
    deleteForumTopicHandler,
};