const express = require('express');
const companyRoute = express.Router();
const { getInfoByID, getLicenseByID, updateInfoByID, updateAvatarByID, deleteAvatarByID, updatePwdByID
    , deleteLicenseByID, updateLicenseByID, getTourByID, updateTourInfo, getBooking, updateBooking, 
    deleteTour, getReview, updateReply, updateReport, updateTourFile } = require('../controllers/companyController')
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

//GET: get company info by email
companyRoute.get("/getInfo/:email", verifyToken, getInfoByID);

//GET: get company license by id_company
companyRoute.get("/getLicense/:id_company", verifyToken, getLicenseByID);

//PUT: update company info by id_company
companyRoute.put("/updateInfo/:id_company", verifyToken, updateInfoByID);

//POST: update freelancer avatar by id_guide
companyRoute.post("/updateAvatar/:id_company", verifyToken, upload('company_avatar').single("file"), updateAvatarByID);

//PUT: update freelancer info by id_guide
companyRoute.put("/deleteAvatar/:id_company", verifyToken, deleteAvatarByID);

//PUT: update company password by id_company
companyRoute.put("/updatePwd/:id_company", verifyToken, updatePwdByID);

// PUT: delete company license by id_company
companyRoute.put("/deleteLicense/:id_company", verifyToken, deleteLicenseByID);

// POST: update company license by id_company
companyRoute.post("/updateLicense/:id_company", verifyToken, upload('company_license').array("file"), updateLicenseByID);

//GET: get company tour by id_company
companyRoute.get("/getTour/:id_company", verifyToken, getTourByID);

// PUT: update tour info by id_tour
companyRoute.put("/updateTourInfo/:id_tour", verifyToken, updateTourInfo);

// POST: update tour file by id_tour
companyRoute.post("/updateTourFile/:id_tour", verifyToken, upload('tour').single("file"), updateTourFile);

// PUT: delete company tour by id_tour
companyRoute.put("/deleteTour/:id_tour", verifyToken, deleteTour);

// GET: get company booking by id_company
companyRoute.get("/getBooking/:id_company", getBooking);

// PUT: update company booking by id_tour
companyRoute.put("/updateBooking/:id_tour_booking", verifyToken, updateBooking);

//GET: get company review by id_company
companyRoute.get("/getReview/:id_company", verifyToken, getReview);

// PUT: update booking reply by id_company
companyRoute.put("/updateReply/:id_company", verifyToken, updateReply);

// PUT: update booking report by id_company
companyRoute.put("/updateReport/:id_company", verifyToken, updateReport);

module.exports = companyRoute;