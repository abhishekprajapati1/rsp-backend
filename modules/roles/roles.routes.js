const express = require('express');
const getRoles = require('./controllers/getRoles');
const createRole = require('./controllers/createRole');
const { createRoleSchema, updateRoleSchema } = require('./role.validations');
const roleRouter = express.Router();
const validate = require("../../middlewares/validate");
const deleteRole = require('./controllers/deleteRole');
const getRole = require('./controllers/getRole');
const updateRole = require('./controllers/updateRole');

roleRouter.get("", getRoles);
roleRouter.get("/:role_id", getRole);
roleRouter.post("", validate(createRoleSchema), createRole);
roleRouter.put("/:role_id", validate(updateRoleSchema), updateRole);
roleRouter.delete("/:role_id", deleteRole);

module.exports = roleRouter;