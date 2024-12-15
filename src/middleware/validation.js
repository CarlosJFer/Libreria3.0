const Joi = require('joi');

const paymentSchema = Joi.object({
    payer_name: Joi.string().required(),
    payer_type: Joi.string().required(),
    payer_number: Joi.string().required(),
    payer_email: Joi.string().email().required(),
    description: Joi.string().required(),
    first_total: Joi.number().required(),
    first_due_date: Joi.date().required(),
    external_reference: Joi.string().required(),
    second_due_date: Joi.date().optional(),
    second_total: Joi.number().optional(),
    payment_type: Joi.string().required(),
    items: Joi.array().items(Joi.object({
        item_id: Joi.string().required(),
        item_name: Joi.string().required(),
        item_quantity: Joi.number().required(),
        item_price: Joi.number().required(),
    })).required(),
});

const uuidSchema = Joi.object({
    uuid: Joi.string().required(),
});

const validatePaymentData = (req, res, next) => {
    const { error } = paymentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

const validateUUID = (req, res, next) => {
    const { error } = uuidSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = {
    validatePaymentData,
    validateUUID,
};
