const express = require('express');
const validate = require("../../middlewares/validate");
const loginUser = require('./controllers/loginUser');
const { loginSchema } = require('./auth.validations');
const authenticate = require("../../middlewares/authenticate");
const getUserDetails = require('./controllers/getUserDetails');
const authRouter = express.Router();

authRouter.post("/login", validate(loginSchema), loginUser);
authRouter.get("/details", authenticate, getUserDetails)

module.exports = authRouter;