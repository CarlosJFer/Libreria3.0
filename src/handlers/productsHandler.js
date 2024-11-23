const express = require('express');
const app = express();

// Middleware de validación de entrada
const validateProductsData = (req, res, next) => {
const { id, title, isbn, genre, author } = req.body;
if (!id || !title || !isbn || !genre || !author) {
    return res.status(400).send("Todos los campos son requeridos");
}
next();
};

const getAllProductsHandler = async (req, res) => {
try {
    const { author, title, isbn, genre, id } = req.query;
    if (author || title || isbn || genre || id) {
    return res.send(`Estos son los libros con los detalles: autor=${author}, título=${title}, ISBN=${isbn}, género=${genre}, id=${id}`);
    }
    res.send("No se encontro el libro especificado");
} catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
}
};

const getOneProductsHandler = async (req, res) => {
try {
    const { id } = req.params;
    if (!id) {
    return res.status(400).send("ID es requerido");
    }
    res.send(`Este es el libro con id ${id}`);
} catch (error) { 
    console.error(error);
    res.status(500).send("Error interno del servidor"); // Error al buscar el producto en la base de datos
}
};

const createProductsHandler = async (req, res) => {
try {
    const { id, title, isbn, genre, author } = req.body;
    console.log(id, title, isbn, genre, author);     
    res.status(201).send(`El libro con el ISBN ${isbn}, título ${title}, género ${genre}, y autor ${author} fue creado con el ID ${id}`);
} catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor"); // Error al guardar el producto en la base de datos
}
};

const updateProductsHandler = async (req, res) => {
try {
    // Lógica para actualizar el producto
    res.send("El libro fue modificado en el sistema");
} catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
}
};

const deleteProductsHandler = async (req, res) => {
try {
    // Lógica para eliminar el producto
    res.send("El libro fue eliminado del sistema");
} catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
}
};

module.exports = {
validateProductsData,
getAllProductsHandler,
getOneProductsHandler,
createProductsHandler,
updateProductsHandler,
deleteProductsHandler,
};
