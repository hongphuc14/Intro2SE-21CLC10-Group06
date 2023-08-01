const express = require('express');
const rootRoute = express.Router();
const adminRoute = require('./adminRoute');

rootRoute.use("/admin", adminRoute);

module.exports = rootRoute;