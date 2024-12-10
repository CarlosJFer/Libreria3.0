const { Router } = require('express');
const { createPaymentRequestHandler, checkPaymentStatusHandler } = require('../handlers/weePagosHandler');

const weePagosRouter = Router();

weePagosRouter.post('/create_payment', createPaymentRequestHandler);
weePagosRouter.post('/check_payment', checkPaymentStatusHandler);

module.exports = weePagosRouter;