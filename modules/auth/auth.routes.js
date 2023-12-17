const express = require('express');
const validate = require("../../middlewares/validate");
const loginUser = require('./controllers/loginUser');
const { loginSchema } = require('./auth.validations');
const authRouter = express.Router();

authRouter.post("/login", validate(loginSchema), loginUser);

module.exports = authRouter;