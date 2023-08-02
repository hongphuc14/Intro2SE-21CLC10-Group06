const express = require('express');
const rootRoute = express.Router();
<<<<<<< HEAD

module.exports = rootRoute
=======
const basicRoute = require('./basicRoute');
const adminRoute = require('./adminRoute');
const touristRoute = require('./touristRoute');
const companyRoute = require('./companyRoute');

rootRoute.use("/basic", basicRoute);
rootRoute.use("/admin", adminRoute);
rootRoute.use("/tourist", touristRoute);
rootRoute.use("/company", companyRoute);

module.exports = rootRoute;
>>>>>>> fc2154d9fb63b94c8c4932382231ad2ad7f47226
