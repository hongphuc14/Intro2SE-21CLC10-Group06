const express = require('express');
const companyRoute = express.Router();
const { getInfoByID, getLicenseByID, updateInfoByID, updateAvatarByID, deleteAvatarByID, updatePwdByID
    , deleteLicenseByID, updateLicenseByID } = require('../controllers/companyController')
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

//GET: get company info by email
companyRoute.get("/getInfo/:email", getInfoByID);

//GET: get company license by id_company
companyRoute.get("/getLicense/:id_company", getLicenseByID);

//PUT: update company info by id_company
companyRoute.put("/updateInfo/:id_company", updateInfoByID);

//POST: update freelancer avatar by id_guide
companyRoute.post("/updateAvatar/:id_company", upload('company_avatar').single("file"), updateAvatarByID);

//PUT: update freelancer info by id_guide
companyRoute.put("/deleteAvatar/:id_company", deleteAvatarByID);

//PUT: update company password by id_company
companyRoute.put("/updatePwd/:id_company", updatePwdByID);

// PUT: delete company license by id_company
companyRoute.put("/deleteLicense/:id_company", deleteLicenseByID);

// POST: update company license by id_company
companyRoute.post("/updateLicense/:id_company", upload('company_license').array("file"), updateLicenseByID);

module.exports = companyRoute;