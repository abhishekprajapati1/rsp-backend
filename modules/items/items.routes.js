const express = require('express');
const getItems = require('./controllers/getItems');
const getItem = require('./controllers/getItem');
const createItem = require('./controllers/createItem');
const deleteItem = require('./controllers/deleteItem');
const updateItem = require('./controllers/updateItem');
const validate = require('../../middlewares/validate');
const { createItemSchema, updateItemSchema } = require('./item.validations');
const itemRouter = express.Router();

itemRouter.get("", getItems);
itemRouter.get("/:item_id", getItem);
itemRouter.post("", validate(createItemSchema), createItem);
itemRouter.delete("/:item_id", deleteItem);
itemRouter.put("/:item_id", validate(updateItemSchema), updateItem);

module.exports = itemRouter;