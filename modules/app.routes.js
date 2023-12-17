const express = require('express');
const authRouter = require('./auth/auth.routes');
const authenticate = require('../middlewares/authenticate');
const usersRouter = require('./users/users.routes');
const roleRouter = require('./roles/roles.routes');
const itemRouter = require('./items/items.routes');
const salesRouter = require('./sales/sales.routes');
const purchaseRouter = require('./purchases/purchase.routes');
const appRouter = express.Router();

appRouter.use("/auth", authRouter);
appRouter.use("/users", authenticate, usersRouter);
appRouter.use("/roles", authenticate, roleRouter);
appRouter.use("/items", authenticate, itemRouter);
appRouter.use("/sales", authenticate, salesRouter);
appRouter.use("/purchases", authenticate, purchaseRouter);

module.exports = appRouter;