const Joi = require('joi');

const loginSchema = Joi.object({
    role: Joi.string().valid("admin", "staff"),
    phone: Joi.string().length(10).pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(8).pattern(/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/).required().messages({
        "string.pattern.base": "Password should be a mix of capital, small letters with numbers and symbols",
    }),
});

const changePasswordSchema = Joi.object({
    current_password: Joi.string().min(8).pattern(/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/).required().messages({
        "string.pattern.base": "Current password should be a mix of capital, small letters with numbers and symbols",
    }),
    new_password: Joi.string().min(8).pattern(/^(?=.*[0-9])(?=.*[- ?!@#$%^&*\/\\])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9- ?!@#$%^&*\/\\]{8,30}$/).required().messages({
        "string.pattern.base": "New password should be a mix of capital, small letters with numbers and symbols",
    }),
})

const updateDetailsSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email()
})

module.exports = {
    loginSchema,
    changePasswordSchema,
    updateDetailsSchema
}