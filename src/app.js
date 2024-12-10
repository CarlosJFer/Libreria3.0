const express = require('express');
const morgan = require('morgan');
const mainRouter = require("./routes/main");
require('dotenv').config();

// SDK de Mercado Pago
const { MercadoPagoConfig } = require('mercadopago');

const mercadoPagoClient = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use('/api', mainRouter);

app.post('/create_preference', async (req, res) => {
    try {
        const body = {
            items: req.body.map((item) => ({
                title: item.title,
                quantity: Number(item.quantity),
                currency_id: 'ARS',
                unit_price: Number(item.price),
            })),
            back_urls: {
                success: '', //Falta la direccion url
                failure: '', //Falta la direccion url
                pending: '', //Falta la direccion url
            },
            auto_return: "approved",
        };
        const preference = new Preference(mercadoPagoClient);
        const result = await preference.create({ body });
        res.json({ id: result.id, });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating preference");
    }
});

module.exports = app;