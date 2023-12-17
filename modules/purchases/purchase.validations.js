const Joi = require("joi");

const createPurchaseSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(1).required(),
    amount: Joi.string().required(),
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