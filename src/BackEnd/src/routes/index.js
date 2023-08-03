const express = require('express');
const rootRoute = express.Router();
<<<<<<< HEAD

=======
>>>>>>> d56f5ef35bb8d2570a75b6e19d2d854ae7467842
const basicRoute = require('./basicRoute');
const adminRoute = require('./adminRoute');
const touristRoute = require('./touristRoute');
const companyRoute = require('./companyRoute');
<<<<<<< HEAD
const freelancerRoute = require('./freelancerRoute');
=======
>>>>>>> d56f5ef35bb8d2570a75b6e19d2d854ae7467842

rootRoute.use("/basic", basicRoute);
rootRoute.use("/admin", adminRoute);
rootRoute.use("/tourist", touristRoute);
rootRoute.use("/company", companyRoute);
<<<<<<< HEAD
rootRoute.use("/freelancer", freelancerRoute);

module.exports = rootRoute;
=======
>>>>>>> d56f5ef35bb8d2570a75b6e19d2d854ae7467842

