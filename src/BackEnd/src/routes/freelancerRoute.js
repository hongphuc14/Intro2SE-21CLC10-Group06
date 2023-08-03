const express = require('express');
const companyRoute = express.Router();
const { getInfoByID, updateInfoByID, updatePwdByID, uploadCompany, uploadLicense } = require('../controllers/companyController')
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

