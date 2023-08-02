const express = require('express');
const companyRoute = express.Router();
const { getInfoByID, updateInfoByID, updatePwdByID, uploadCompany, uploadLicense } = require('../controllers/companyController')
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

//GET: get company info by id_company
companyRoute.get("/getInfo/:id_company", verifyToken, getInfoByID);

//PUT: update company info by id_company
companyRoute.put("/updateInfo/:id_company", verifyToken, updateInfoByID);

//PUT: update company password by id_company
companyRoute.put("/updatePwd/:id_company", verifyToken, updatePwdByID);

//POST: upload company avatar by id_company
companyRoute.post("/uploadAvatar/:id_company", verifyToken, upload('company_avatar').single("dataUpload"), uploadCompany);

//POST: upload company avatar by id_company
companyRoute.post("/uploadLicense/:id_company", verifyToken, upload('company_license').single("dataUpload"), uploadLicense);

module.exports = companyRoute;