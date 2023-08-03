const express = require('express');
const rootRoute = express.Router();
const basicRoute = require('./basicRoute');
const adminRoute = require('./adminRoute');
const touristRoute = require('./touristRoute');
const companyRoute = require('./companyRoute');

rootRoute.use("/basic", basicRoute);
rootRoute.use("/admin", adminRoute);
rootRoute.use("/tourist", touristRoute);
rootRoute.use("/company", companyRoute);

