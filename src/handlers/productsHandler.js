const { createProductController,
    getAllProductsController,
    getProductByGenreController,
    getProductByTitleController,
    getProductByAuthorController,
    getProductByIsbnController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
    getProductByPriceController } = require("../controllers/productsController");

const express = require('express');
const app = express();
app.use(express.json());

const Joi = require('joi');

const productsSchema = Joi.object({
    title: Joi.string().min(2).required().messages({
        "string.empty": "El título no puede estar vacío",
        "string.min": "El título debe tener al menos 2 caracteres",
        "any.required": "El título es un campo obligatorio",
    }),
    isbn: Joi.string().min(3).required().messages({
        "string.empty": "El ISBN no puede estar vacío",
        "string.min": "El ISBN debe tener al menos 3 caracteres",
        "any.required": "El ISBN es un campo obligatorio",
    }),
    genre: Joi.string().min(2).required().messages({
        "string.empty": "El género no puede estar vacío",
        "string.min": "El género debe tener al menos 2 caracteres",
        "any.required": "El género es un campo obligatorio",
    }),
    author: Joi.string().min(2).required().messages({
        "string.empty": "El autor no puede estar vacío",
        "string.min": "El autor debe tener al menos 2 caracteres",
        "any.required": "El autor es un campo obligatorio",
    }),
    price: Joi.number().positive().required().messages({
        "number.base": "El precio debe ser un número",
        "number.positive": "El precio debe ser un valor positivo",
        "any.required": "El precio es un campo obligatorio",
    }),
});

const validateProductData = (req, res, next) => {
    const { error } = productsSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({ Error: `Errores de validación: ${errorMessages.join(', ')}` });
    }

    next();
};

const getAllProductsHandler = async (req, res) => {
    const { author, title, isbn, genre, price } = req.query;
    let response;
    const queryMap = {
        isbn: getProductByIsbnController,
        title: getProductByTitleController,
        author: getProductByAuthorController,
        genre: getProductByGenreController,
        price: getProductByPriceController
    };
    try {
        const queryKey = Object.keys(req.query).find(key => queryMap[key]);
        if (queryKey) {
            response = await queryMap[queryKey](req.query[queryKey]);
        } else {
            response = await getAllProductsController();
        }
        if (!response.length) {
            return res.status(404).json({ Error: 'Libro no encontrado' });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Error al intentar obtener los libros:", error);
        res.status(500).json({ Error: error.message });
    }
};

const getOneProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ Error: "El ID es requerido y debe ser un número válido." });
        }
        const response = await getProductByIdController(Number(id));
        if (!response) {
            return res.status(404).json({ Error: "Libro no encontrado" });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Error al obtener el libro:", error);
        res.status(500).json({ Error: "Error interno del servidor" });
    }
};

const createProductHandler = async (req, res) => {
    try {
        // Validar datos de entrada con Joi
        const { error } = productsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ Error: error.details[0].message });
        }

        const { title, isbn, genre, author, price } = req.body;

        // Llamar al controlador para crear el producto
        const response = await createProductController(title, isbn, genre, author, price);
        res.status(201).json(response);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ Error: error.message || "Error interno del servidor" });
    }
};

const updateProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ Error: "El ID es requerido y debe ser un número válido." });
        }
        const { author, title, isbn, genre, price } = req.body;
        const response = await updateProductController(Number(id), title, isbn, genre, author, price);
        if (!response) {
            return res.status(404).json({ Error: "Libro no encontrado" });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Error al actualizar el libro:", error);
        res.status(500).json({ Error: "Error interno del servidor" });
    }
};

const deleteProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ Error: "El ID es requerido y debe ser un número válido." });
        }
        const response = await deleteProductController(Number(id));
        if (!response) {
            return res.status(404).json({ Error: "Producto no encontrado" });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ Error: "Error interno del servidor" });
    }
};

module.exports = {
    validateProductData,
    getAllProductsHandler,
    getOneProductHandler,
    createProductHandler,
    updateProductHandler,
    deleteProductHandler,
};