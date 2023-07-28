const express = require('express');
const rootRoute = express.Router();
const adminRoute = require('./adminRoute');

adminRoute.use("/admin", adminRoute);

module.exports = rootRoute;