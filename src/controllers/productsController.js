const products = require('../db/dataBaseProducts');

const createProductController = async (title, isbn, genre, author, price) => {
    if (!title || !isbn || !genre || !author || price === undefined) {
        throw new Error("Error: Faltan datos del libro");
    }

    // Verificar si el producto ya existe
    const existingProduct = products.find(product => product.isbn === isbn);
    if (existingProduct) {
        const error = new Error("Error: El libro con este ISBN ya existe");
        error.statusCode = 409;
        throw error;
    }

    // Crear nuevo ID
    const newId = products.length ? Math.max(...products.map(product => product.id)) + 1 : 1;

    // Crear el producto y añadirlo a la lista
    const newProduct = { id: newId, title, isbn, genre, author, price };
    products.push(newProduct);
    return newProduct;
};

const getAllProductsController = async () => {
    return products.length ? products : [];
};

const getProductByAuthorController = async (author) => {
    if (!author) {
        throw new Error("Error: El autor del libro es requerido");
    }

    const productsByAuthor = products.filter(product => 
        product.author.toLowerCase() === author.toLowerCase()
    );

    return productsByAuthor;
};

const getProductByTitleController = async (title) => {
    if (!title) {
        throw new Error("Error: El título del libro es requerido");
    }

    const productsByTitle = products.filter(product => 
        product.title.toLowerCase() === title.toLowerCase()
    );

    return productsByTitle;
};

const getProductByGenreController = async (genre) => {
    if (!genre) {
        throw new Error("Error: El género del libro es requerido");
    }

    const productsByGenre = products.filter(product => 
        product.genre.toLowerCase() === genre.toLowerCase()
    );

    return productsByGenre;
};

const getProductByIsbnController = async (isbn) => {
    if (!isbn) {
        throw new Error("Error: El ISBN del libro es requerido");
    }

    const productsByIsbn = products.filter(product => product.isbn === isbn);

    return productsByIsbn;
};

const getProductByIdController = async (id) => {
    if (!id || isNaN(Number(id))) {
        throw new Error("Error: El ID es requerido y debe ser un número válido");
    }

    const productById = products.find(product => product.id === Number(id));

    return productById || null;
};

const getProductByPriceController = async (price) => {
    if (price === undefined || isNaN(Number(price))) {
        throw new Error("Error: El precio es requerido y debe ser un número válido");
    }

    const productsByPrice = products.filter(product => product.price === Number(price));

    return productsByPrice;
};

const updateProductController = async (id, title, isbn, genre, author, price) => {
    if (!id || isNaN(Number(id))) {
        throw new Error("Error: El ID es requerido y debe ser un número válido");
    }

    const productUpdateById = products.find(product => product.id === Number(id));

    if (!productUpdateById) {
        throw new Error('Error: Libro no encontrado');
    }

    if (title !== undefined) productUpdateById.title = title;
    if (isbn !== undefined) productUpdateById.isbn = isbn;
    if (genre !== undefined) productUpdateById.genre = genre;
    if (author !== undefined) productUpdateById.author = author;
    if (price !== undefined) productUpdateById.price = price;

    return productUpdateById;
};

const deleteProductController = async (id) => {
    if (!id || isNaN(Number(id))) {
        throw new Error('Error: El ID es requerido y debe ser un número válido');
    }

    const index = products.findIndex((product) => product.id === Number(id));

    if (index === -1) {
        throw new Error('Error: Libro no encontrado');
    }

    const [deletedProduct] = products.splice(index, 1);
    return deletedProduct;
};

module.exports = {
    createProductController,
    getAllProductsController,
    getProductByGenreController,
    getProductByTitleController,
    getProductByAuthorController,
    getProductByIsbnController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
    getProductByPriceController
};