const express = require("express");
const createSale = require("./controllers/createSale");
const validate = require("../../middlewares/validate");
const { createSaleSchema } = require("./sales.validations");
const getSales = require("./controllers/getSales");
const getSale = require("./controllers/getSale");
const updateSale = require("./controllers/updateSale");
const deleteSale = require("./controllers/deleteSale");
const salesRouter = express.Router();


salesRouter.get("", getSales);
salesRouter.get("/:sale_id", getSale);
salesRouter.post("", validate(createSaleSchema), createSale)
salesRouter.put("/:sale_id", updateSale);
salesRouter.delete("/:sale_id", deleteSale);


module.exports = salesRouter;