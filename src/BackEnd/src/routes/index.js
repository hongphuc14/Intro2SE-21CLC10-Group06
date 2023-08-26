const express = require('express');
const rootRoute = express.Router();
const basicRoute = require('./basicRoute');
const adminRoute = require('./adminRoute');
//const touristRoute = require('./touristRoute');
//const companyRoute = require('./companyRoute');
//const freelancerRoute = require('./freelancerRoute');

rootRoute.use("/basic", basicRoute);
rootRoute.use("/admin", adminRoute);
//rootRoute.use("/tourist", touristRoute);
//rootRoute.use("/company", companyRoute);
//rootRoute.use("/freelancer", freelancerRoute);

module.exports = rootRoute;