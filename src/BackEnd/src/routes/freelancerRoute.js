const express = require('express');
const freelancerRoute = express.Router();
const { getInfoByID, getLanguageByID, getLicenseByID, getAttractionByID, getTimeByID,
        updateInfoByID, updatePwdByID, updateAvatarByID, deleteAvatarByID, updateLanguageByID, 
        deleteLicenseByID, updateLicenseByID, updateTimeByID, updateAttrationByID, deleteAttraction,
        getGuideBookingByID, updateBookingStatusByID, getGuideReviewByID, updateGuideReplyByID, 
        updateGuideReportByID } = require('../controllers/freelancerController')
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

//GET: get freelancer info by id_guide
freelancerRoute.get("/getInfo/:email", verifyToken, getInfoByID);

//GET: get freelancer languages by id_guide
freelancerRoute.get("/getLanguage/:id_guide", verifyToken, getLanguageByID);

//GET: get freelancer license by id_guide
freelancerRoute.get("/getLicense/:id_guide", verifyToken, getLicenseByID);

//GET: get freelancer attration by id_guide
freelancerRoute.get("/getAttraction/:id_guide", verifyToken, getAttractionByID);

//GET: get freelancer time by id_guide
freelancerRoute.get("/getTime/:id_guide", verifyToken, getTimeByID);

//POST: update freelancer avatar by id_guide
freelancerRoute.post("/updateAvatar/:id_guide", verifyToken, upload('freelancer_avatar').single("file"), verifyToken, updateAvatarByID);

//PUT: update freelancer info by id_guide
freelancerRoute.put("/deleteAvatar/:id_guide", verifyToken, deleteAvatarByID);

//PUT: update freelancer info by id_guide
freelancerRoute.put("/updateInfo/:id_guide", verifyToken, updateInfoByID);

//PUT: update freelancer password by id_guide
freelancerRoute.put("/updatePwd/:id_guide", verifyToken, updatePwdByID);

//PUT: update freelancer language by id_guide
freelancerRoute.put("/updateLanguage/:id_guide", verifyToken, updateLanguageByID);

// PUT: delete freelancer license by id_guide
freelancerRoute.put("/deleteLicense/:id_guide", verifyToken, deleteLicenseByID);

// POST: update freelancer license by id_guide
freelancerRoute.post("/updateLicense/:id_guide", verifyToken, upload('freelancer_license').array("file"), updateLicenseByID);

// PUT: update freelancer attraction by id_guide
freelancerRoute.post("/updateAttraction/:id_guide", verifyToken,  upload('attraction').single("file"), updateAttrationByID);

//PUT: delete freelancer attracion by id_guide
freelancerRoute.put("/deleteAttraction/:id_guide", verifyToken, deleteAttraction);

//PUT: update freelancer time by id_guide
freelancerRoute.put("/updateTime/:id_guide", verifyToken, updateTimeByID);

//GET: get freelancer booking by id_guide
freelancerRoute.get("/getBooking/:id_guide", verifyToken, getGuideBookingByID);

//PUT: update freelancer booking status by id_guide
freelancerRoute.put("/updateBookingStatus/:id_guide", verifyToken, updateBookingStatusByID);

//GET: get freelancer review by id_guide
freelancerRoute.get("/getReview/:id_guide", getGuideReviewByID);

//PUT: update freelancer reply by id_guide
freelancerRoute.put("/updateReply/:id_guide", verifyToken, updateGuideReplyByID);

//PUT: update freelancer report by id_guide
freelancerRoute.put("/updateReport/:id_guide", verifyToken, updateGuideReportByID);

module.exports = freelancerRoute;

