const express = require('express');
const freelancerRoute = express.Router();
// const { getInfoByID, updateInfoByID, updatePwdByID, uploadCompany, uploadLicense } = require('../controllers/companyController')
const { upload } = require('../middlewares/upload');


module.exports = freelancerRoute;