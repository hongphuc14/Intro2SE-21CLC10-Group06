const express = require('express');
<<<<<<< HEAD
const freelancerRoute = express.Router();
// const { getInfoByID, updateInfoByID, updatePwdByID, uploadCompany, uploadLicense } = require('../controllers/companyController')
const { upload } = require('../middlewares/upload');


module.exports = freelancerRoute;
=======
const companyRoute = express.Router();
const { getInfoByID, updateInfoByID, updatePwdByID, uploadCompany, uploadLicense } = require('../controllers/companyController')
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

>>>>>>> d56f5ef35bb8d2570a75b6e19d2d854ae7467842
