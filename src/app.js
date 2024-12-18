const express = require('express');
const path = require('path');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const { MercadoPagoConfig, Preference } = require("mercadopago");
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
});
const Order = require("./models/Order");
const { createOrderController } = require("./controllers/orderController");
const mainRouter = require("./routes/main");
const verifyToken = require("./middleware/verifyMiddleware");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

app.use(cors({
    origin: ['https://libreria3-0.onrender.com', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true
}));

// Configurar archivos estáticos
const CLIENT_BUILD_PATH = path.join(__dirname, '..', '..', 'client', 'public');

// Middleware para servir archivos estáticos con tipos MIME correctos
app.use(express.static(CLIENT_PUBLIC_PATH, {
    setHeaders: (res, filePath) => {
        if (path.extname(filePath) === '.css') {
            res.setHeader('Content-Type', 'text/css');
        } else if (path.extname(filePath) === '.js') {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Rutas API
app.use('/api', mainRouter);

// Rutas para páginas de éxito, fallo y pendiente
app.get('/success', (req, res) => {
    res.sendFile(path.join(CLIENT_PUBLIC_PATH, 'success', 'index.html'));
});

app.get('/success/styles.css', (req, res) => {
    res.sendFile(path.join(CLIENT_PUBLIC_PATH, 'success', 'styles.css'), {
        headers: {
            'Content-Type': 'text/css'
        }
    });
});

app.get('/success/script.js', (req, res) => {
    res.sendFile(path.join(CLIENT_PUBLIC_PATH, 'success', 'script.js'), {
        headers: {
            'Content-Type': 'application/javascript'
        }
    });
});
app.get('/failure', (req, res) => {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'failure', 'index.html'), {
        headers: {
            'Content-Type': 'text/html',
        }
    });
});

app.get('/pending', (req, res) => {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'pending', 'index.html'), {
        headers: {
            'Content-Type': 'text/html',
        }
    });
});

// manejadores de archivos estáticos específicos para success
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'success', 'styles.css'), {
        headers: {
            'Content-Type': 'text/css',
        }
    });
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'success', 'script.js'), {
        headers: {
            'Content-Type': 'application/javascript',
        }
    });
});

// Endpoint para crear una preferencia de pago
app.post('/create_preference', verifyToken, async (req, res) => {
    console.log('Solicitud recibida:', req.body);
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    console.log('Token recibido en la solicitud:', token);

    const { items, metodoPago } = req.body;
    const userId = req.user._id;

    console.log('User ID:', userId); // Verifica que el userId se esté pasando correctamente

    try {
        const order = await createOrderController(
            userId,
            new Date(),
            'Pendiente',
            metodoPago,
            items
        );
        const orderId = order._id;

        const body = {
            items: items.map((item) => ({
                title: item.title,
                quantity: Number(item.cantidad),
                currency_id: 'ARS',
                unit_price: Number(item.precio),
            })),
            back_urls: {
                success: `https://libreria3-0.onrender.com/success?orderId=${orderId}`, // Incluyendo orderId
                failure: 'https://libreria3-0.onrender.com/failure',
                pending: 'https://libreria3-0.onrender.com/pending',
            },
            auto_return: 'approved',
        };

        const preferences = new Preference(client);
        const preference = await preferences.create({ body });

        if (preference && preference.id) {
            res.json({ id: preference.id, init_point: preference.init_point });
        } else {
            console.error('Respuesta inesperada de Mercado Pago:', preference);
            res.status(500).send({ error: 'Error al crear la preferencia de pago.' });
        }
    } catch (error) {
        console.error('Error en create_preference:', error);
        res.status(500).send({ error: error.message });
    }
});

app.post('/webhook', async (req, res) => {
    console.log('Notificación recibida:', req.body);
    const notification = req.body;

    if (notification.type === 'payment') {
        // Lógica para manejar las notificaciones de pago
    }

    res.status(200).send();
});

app.get('/api/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId);

        if (!order) {
            console.log('Order not found for ID:', orderId);
            return res.status(404).json({ error: 'Order not found' });
        }
        console.log('Order found:', order);
        console.log('Download URLs:', order.downloadUrls);

        res.json({
            fecha: order.fecha,
            monto: order.total,
            metodoPago: order.metodoPago,
            downloadUrls: order.downloadUrls || [] 
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = app;