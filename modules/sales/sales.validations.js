const Joi = require("joi");

const createSaleSchema = Joi.object({
    payment_mode: Joi.string().valid("online", "cash").required(),
    quantity: Joi.number().required().min(1),
    total_price: Joi.number().required().min(40),
    item_id: Joi.string().hex().length(24).required().messages({
        "string.hex": "The 'item_id' field must be a valid id.",
        "string.length": "The 'item_id' field must be a valid id."
    }),
})

const updateSaleSchema = Joi.object({
    payment_mode: Joi.string().valid("online", "cash"),
    quantity: Joi.number().min(1),
    total_price: Joi.number().min(40),
    item_id: Joi.string().hex().length(24).required().messages({
        "string.hex": "The 'item_id' field must be a valid hexadecimal string.",
        "string.length": "The 'item_id' field must be 24 characters long."
    }),
})

module.exports = {
    createSaleSchema,
    updateSaleSchema
}