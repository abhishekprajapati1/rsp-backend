const Joi = require("joi");

const createItemSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
})

const updateItemSchema = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
}).required();

module.exports = {
    createItemSchema,
    updateItemSchema
}