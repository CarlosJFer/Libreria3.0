// src/handlers/weePagosHandler.js
const { createPaymentRequest, checkPaymentStatus } = require('../controllers/weePagosController');

const createPaymentRequestHandler = async (req, res) => {
    try {
        const paymentData = {
            payer_name: req.body.payer_name,
            payer_type: req.body.payer_type,
            payer_number: req.body.payer_number,
            payer_email: req.body.payer_email,
            description: req.body.description,
            first_total: req.body.first_total,
            first_due_date: req.body.first_due_date,
            external_reference: req.body.external_reference,
            second_due_date: req.body.second_due_date,
            second_total: req.body.second_total,
            payment_type: req.body.payment_type,
            items: req.body.items,
        };
        
        const response = await createPaymentRequest(paymentData);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ Error: error.message });
    }
};

const checkPaymentStatusHandler = async (req, res) => {
    try {
        const { uuid } = req.body; // Asegúrate de enviar el uuid en el cuerpo de la solicitud
        const response = await checkPaymentStatus(uuid);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ Error: error.message });
    }
};

module.exports = {
    createPaymentRequestHandler,
    checkPaymentStatusHandler,
};