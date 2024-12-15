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
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error al crear la solicitud de pago. Por favor, revisa los datos e intenta de nuevo.' });
    }
};

const checkPaymentStatusHandler = async (req, res) => {
    try {
        const { uuid } = req.body;
        const response = await checkPaymentStatus(uuid);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Error al consultar el estado del pago. Por favor, revisa los datos e intenta de nuevo.' });
    }
};

module.exports = {
    createPaymentRequestHandler,
    checkPaymentStatusHandler,
};
