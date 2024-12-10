// src/controllers/weePagosController.js
const axios = require('axios');

const weePagosClient = axios.create({
    baseURL: 'https://sb-wee.ar/v1/', // Asegúrate de que esta sea la URL correcta
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WEE_API_KEY}`,
    },
});

const createPaymentRequest = async (paymentData) => {
    try {
        const response = await weePagosClient.post('/checkout', paymentData);
        return response.data;
    } catch (error) {
        throw new Error(`Error al crear la solicitud de pago: ${error.message}`);
    }
};

const checkPaymentStatus = async (uuid) => {
    try {
        const response = await weePagosClient.post('/estados-pagos', { uuid });
        return response.data;
    } catch (error) {
        throw new Error(`Error al consultar el estado del pago: ${error.message}`);
    }
};

module.exports = {
    createPaymentRequest,
    checkPaymentStatus,
};