const Joi = require("joi");


const createUserSchema = Joi.object({
    name: Joi.string().trim().required(),
    phone: Joi.string().trim().length(10).required(),
    role_id: Joi.string().hex().length(24).required().messages({
        "string.hex": "The 'role_id' field must be a valid id.",
        "string.length": "The 'role_id' field must be a valid id."
    }),
    password: Joi.string().min(8).pattern(/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/).required().messages({
        "string.pattern.base": "Password should be a mix of capital, small letters with numbers and symbols",
    }),
});

const updateUserSchema = Joi.object({
    name: Joi.string().trim(),
    phone: Joi.string().trim().length(10),
    role_id: Joi.string().hex().length(24).required().messages({
        "string.hex": "The 'role_id' field must be a valid id.",
        "string.length": "The 'role_id' field must be a valid id."
    }),
});

module.exports = {
    createUserSchema,
    updateUserSchema
}