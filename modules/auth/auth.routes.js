const express = require('express');
const validate = require("../../middlewares/validate");
const loginUser = require('./controllers/loginUser');
const { loginSchema, changePasswordSchema, updateDetailsSchema } = require('./auth.validations');
const authenticate = require("../../middlewares/authenticate");
const getUserDetails = require('./controllers/getUserDetails');
const changePassword = require('./controllers/changePassword');
const updateUserDetails = require('./controllers/updateUserDetails');
const authRouter = express.Router();

authRouter.post("/login", validate(loginSchema), loginUser);
authRouter.get("/details", authenticate, getUserDetails)
authRouter.patch("/details", authenticate, validate(updateDetailsSchema), updateUserDetails)
authRouter.put("/change-password", authenticate, validate(changePasswordSchema), changePassword);

module.exports = authRouter;