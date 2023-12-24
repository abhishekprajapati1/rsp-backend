const Joi = require("joi");

const createPurchaseSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(1).required(),
    quantity: Joi.string().required(),
    payment_mode: Joi.string().valid("cash", "online").required()
})

const updatePurchaseSchema = Joi.object({
    name: Joi.string(),
    amount: Joi.string(),
    price: Joi.number().min(1)
})

module.exports = {
    createPurchaseSchema,
    updatePurchaseSchema,
}