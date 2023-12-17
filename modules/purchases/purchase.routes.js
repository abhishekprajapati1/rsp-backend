const express = require('express');
const validate = require("../../middlewares/validate");
const getPurchases = require('./controllers/getPurchases');
const getPurchase = require('./controllers/getPurchase');
const createPurchase = require('./controllers/createPurchase');
const updatePurchase = require('./controllers/updatePurchase');
const deletePurchase = require('./controllers/deletePurchase');
const { createPurchaseSchema, updatePurchaseSchema } = require('./purchase.validations');

const purchaseRouter = express.Router();

purchaseRouter.get("", getPurchases);
purchaseRouter.get("/:purchase_id", getPurchase);
purchaseRouter.post("", validate(createPurchaseSchema), createPurchase);
purchaseRouter.put("/:purchase_id", validate(updatePurchaseSchema), updatePurchase);
purchaseRouter.delete("/:purchase_id", deletePurchase);

module.exports = purchaseRouter;