const { Router } = require('express');
const { createPaymentRequestHandler, checkPaymentStatusHandler } = require('../handlers/weePagosHandler');
const { validatePaymentData, validateUUID } = require('../middleware/validation'); // Importa los middleware de validación

const weePagosRouter = Router();

weePagosRouter.post('/create_payment', validatePaymentData, createPaymentRequestHandler);
weePagosRouter.post('/check_payment', validateUUID, checkPaymentStatusHandler);

module.exports = weePagosRouter;