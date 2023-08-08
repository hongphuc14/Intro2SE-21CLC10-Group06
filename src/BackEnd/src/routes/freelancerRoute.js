const express = require('express');
const freelancerRoute = express.Router();
const { getInfoByID, getLanguageByID, getLicenseByID, getAttractionByID, getTimeByID,
        updateInfoByID, updatePwdByID, uploadAvatar, updateLanguageByID, uploadLicense } = require('../controllers/freelancerController')
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

//GET: get freelancer info by id_guide
freelancerRoute.get("/getInfo/:email", getInfoByID);

//GET: get freelancer languages by id_guide
freelancerRoute.get("/getLanguage/:id_guide", getLanguageByID);

//GET: get freelancer license by id_guide
freelancerRoute.get("/getLicense/:id_guide", getLicenseByID);

//GET: get freelancer attration by id_guide
freelancerRoute.get("/getAttraction/:id_guide", getAttractionByID);

//GET: get freelancer time by id_guide
freelancerRoute.get("/getTime/:id_guide", getTimeByID);

//PUT: update freelancer info by id_guide
freelancerRoute.put("/updateInfo/:id_guide", updateInfoByID);

//PUT: update freelancer password by id_guide
// freelancerRoute.put("/updatePwd/:id_guide", updatePwdByID);

//PUT: update freelancer avatar by id_guide
// update vậy có cần middleware upload không
// freelancerRoute.post("/uploadAvatar/:id_guide", verifyToken, upload('freelancer_avatar').single("dataUpload"), updateAvatarByID);

//PUT: update freelancer language by id_guide
freelancerRoute.put("/updateLanguage/:id_guide", updateLanguageByID);

//PUT: update freelancer license by id_guide
// freelancerRoute.post("/uploadLicense/:id_guide", verifyToken, upload('freelancer_license').single("dataUpload"), uploadLicense);

//PUT: update freelancer attraction by id_guide
// freelancerRoute.put("/updateAttraction/:id_guide", verifyToken, updateAttrationByID);

//PUT: update freelancer time by id_guide
// freelancerRoute.put("/updateTime/:id_guide", verifyToken, updateTimeByID);

module.exports = freelancerRoute;

