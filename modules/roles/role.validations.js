const Joi = require("joi");

const createRoleSchema = Joi.object({
    title: Joi.string().trim().required(),
})

const updateRoleSchema = Joi.object({
    title: Joi.string().trim()
}).required()

module.exports = {
    createRoleSchema,
    updateRoleSchema
}