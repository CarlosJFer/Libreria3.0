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
    origin: 'https://libreria3-0.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    credentials: true
}));

// Middleware para configurar tipo MIME manualmente (opcional)
const mime = require('mime');
app.use((req, res, next) => {
    const type = mime.getType(req.path);
    if (type) {
        res.type(type);
    }
    next();
});

// Configurar archivos estáticos
app.use('/success', express.static(path.join(__dirname, '..', 'client', 'public', 'success')));

// Configurar el middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'client', 'public', 'success')));

app.use('/api', mainRouter);

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'success', 'index.html'));
});

app.get('/failure', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'failure', 'index.html'));
});

app.get('/pending', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'pending', 'index.html'));
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
            return res.status(404).json({ error: 'Order not found' });
        }

        console.log('Order details:', order); // Verificar datos de la orden
        res.json({
            fecha: order.fecha,
            monto: order.total,
            metodoPago: order.metodoPago,
            downloadUrls: order.downloadUrls // Devolver la lista de URLs de descarga
        });
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = app;