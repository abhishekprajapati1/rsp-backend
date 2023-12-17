const express = require('express');
const getUsers = require('./controllers/getUsers');
const validate = require("../../middlewares/validate");
const { createUserSchema } = require('./users.validations');
const createUser = require('./controllers/createUser');
const deleteUser = require('./controllers/deleteUser');
const usersRouter = express.Router();

usersRouter.get("", getUsers);
usersRouter.post("", validate(createUserSchema), createUser);
usersRouter.delete("/:user_id", deleteUser);

module.exports = usersRouter;