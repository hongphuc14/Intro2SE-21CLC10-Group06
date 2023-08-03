const express = require('express');
const companyRoute = express.Router();
const { getInfoByID, updateInfoByID, updatePwdByID, uploadCompany, uploadLicense } = require('../controllers/companyController')
const { upload } = require('../middlewares/upload');
<<<<<<< HEAD

//GET: get company info by id_company
companyRoute.get("/getInfo/:id_company", getInfoByID);

//PUT: update company info by id_company
companyRoute.put("/updateInfo/:id_company", updateInfoByID);

//PUT: update company password by id_company
companyRoute.put("/updatePwd/:id_company", updatePwdByID);

//POST: upload company avatar by id_company
companyRoute.post("/uploadAvatar/:id_company", upload('company_avatar').single("dataUpload"), uploadCompany);

//POST: upload company avatar by id_company
companyRoute.post("/uploadLicense/:id_company", upload('company_license').single("dataUpload"), uploadLicense);
=======
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
>>>>>>> d56f5ef35bb8d2570a75b6e19d2d854ae7467842

module.exports = companyRoute;