const Joi = require('joi');

const loginSchema = Joi.object({
    role: Joi.string().valid("admin", "staff"),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).pattern(/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/).required().messages({
        "string.pattern.base": "Password should be a mix of capital, small letters with numbers and symbols",
    }),
})

module.exports = {
    loginSchema
}