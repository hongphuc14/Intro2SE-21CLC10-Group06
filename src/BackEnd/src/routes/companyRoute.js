const express = require('express');
const companyRoute = express.Router();
const { getInfoByID, getLicenseByID, updateInfoByID, updateAvatarByID, deleteAvatarByID, updatePwdByID
    , deleteLicenseByID, updateLicenseByID, getTourByID, updateTourInfo, getBooking, updateBooking, 
    deleteTour, getReview, updateReply, updateReport, updateTourFile } = require('../controllers/companyController')
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

//GET: get company tour by id_company
companyRoute.get("/getTour/:id_company", getTourByID);

// PUT: update tour info by id_tour
companyRoute.put("/updateTourInfo/:id_tour", updateTourInfo);

// POST: update tour file by id_tour
companyRoute.post("/updateTourFile/:id_tour", upload('tour').single("file"), updateTourFile);

// PUT: delete company tour by id_tour
companyRoute.put("/deleteTour/:id_tour", deleteTour);

// GET: get company booking by id_company
companyRoute.get("/getBooking/:id_company", getBooking);

// PUT: update company booking by id_tour
companyRoute.put("/updateBooking/:id_tour_booking", updateBooking);

//GET: get company review by id_company
companyRoute.get("/getReview/:id_company", getReview);

// PUT: update booking reply by id_company
companyRoute.put("/updateReply/:id_company", updateReply);

// PUT: update booking report by id_company
companyRoute.put("/updateReport/:id_company", updateReport);

module.exports = companyRoute;