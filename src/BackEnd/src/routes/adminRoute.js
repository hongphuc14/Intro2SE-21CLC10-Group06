const express = require('express');
const adminRoute = express.Router();
const { getInfoByID, updateInfoByID, updatePwdByID, uploadAdmin, getAvatarByID,
        getArrGuideLicense, getArrCompanyLicense, getGuideLicense, getCompanyLicense, 
        updateCompanyLicenseStatus, updateFreelancerLicenseStatus, getArrGuideBooking, 
        getArrTourBooking, getArrTourist, getArrCompany, getArrFreelancer, getArrGuideReview,
        getArrTourReview, getArrGuideReport, getArrTourReport, updateTourReportStatus, deleteTourReport,
        updateGuideReportStatus, deleteGuideReport, updateTourReviewReportStatus, deleteTourReviewReport,
        updateGuideReviewReportStatus, deleteGuideReviewReport, getTouristByID, getTouristGuideBooking, 
        getTouristTourBooking, getCompanyByID, getCompanyTour, getCompanyLicensesByIDCompany, getFreelancerByID,
        getFreelancerAttraction, getFreelancerLicensesByIDGuide, getFreelancerTime, getFreelancerLanguage,
        getArrTour } = require('../controllers/adminController')
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

//GET: get admin info by id_admin
adminRoute.get("/getInfo/:id_admin", verifyToken, getInfoByID);

//PUT: update admin info by id_admin
adminRoute.put("/updateInfo/:id_admin", verifyToken, updateInfoByID);

//PUT: update admin password by id_admin
adminRoute.put("/updatePwd/:id_admin", verifyToken, updatePwdByID);

//POST: upload admin avatar by id_admin
adminRoute.post("/uploadAvatar/:id_admin", verifyToken, upload('admin_avatar').single("dataUpload"), uploadAdmin);

//GET: get admin avatar by id_admin
adminRoute.get("/getAvatar/:id_admin", verifyToken, getAvatarByID);

//GET: get array guide license
adminRoute.get("/getArrGuideLicense", verifyToken, getArrGuideLicense);

//GET: get array company license
adminRoute.get("/getArrCompanyLicense", verifyToken, getArrCompanyLicense);

//GET: get guide license
adminRoute.get("/getGuideLicense/:id_guide/:file_path", verifyToken, getGuideLicense);

//GET: get company license
adminRoute.get("/getCompanyLicense/:id_company/:file_path", verifyToken, getCompanyLicense);

//PUT: update company license status by file_path
adminRoute.put("/updateCompanyLicenseStatus/:file_path/:status", verifyToken, updateCompanyLicenseStatus);

//PUT: update freelancer license status by file_path
adminRoute.put("/updateFreelancerLicenseStatus/:file_path/:status", verifyToken, updateFreelancerLicenseStatus);

//GET: get array guide booking
adminRoute.get("/getArrGuideBooking", verifyToken, getArrGuideBooking);

//GET: get array tour booking
adminRoute.get("/getArrTourBooking", verifyToken, getArrTourBooking);

//GET: get array tourist
adminRoute.get("/getArrTourist", verifyToken, getArrTourist);

//GET: get array company
adminRoute.get("/getArrCompany", verifyToken, getArrCompany);

//GET: get array freelancer
adminRoute.get("/getArrFreelancer", verifyToken, getArrFreelancer);

//GET: get array tour reviews
adminRoute.get("/getArrTourReview", verifyToken, getArrTourReview);

//GET: get array guide reviews
adminRoute.get("/getArrGuideReview", verifyToken, getArrGuideReview);

//GET: get array tour report
adminRoute.get("/getArrTourReport", verifyToken, getArrTourReport);

//GET: get array guide report
adminRoute.get("/getArrGuideReport", verifyToken, getArrGuideReport);

//PUT: update tour report status by id_tour
adminRoute.put("/updateTourReportStatus/:id_tour", verifyToken, updateTourReportStatus);

//DELETE: delete tour report by id_tour
adminRoute.delete("/deleteTourReport/:id_tour", verifyToken, deleteTourReport);

//PUT: update guide report status by id_guide
adminRoute.put("/updateGuideReportStatus/:id_guide", verifyToken, updateGuideReportStatus);

//DELETE: delete guide report by id_guide
adminRoute.delete("/deleteGuideReport/:id_guide", verifyToken, deleteGuideReport);

//PUT: update tour review report status by id_tour_booking
adminRoute.put("/updateTourReviewReportStatus/:id_tour_booking", verifyToken, updateTourReviewReportStatus);

//DELETE: delete tour review report by id_tour_booking
adminRoute.delete("/deleteTourReviewReport/:id_tour_booking", verifyToken, deleteTourReviewReport);

//PUT: update guide review report status by id_guide_booking
adminRoute.put("/updateGuideReviewReportStatus/:id_guide_booking", verifyToken, updateGuideReviewReportStatus);

//DELETE: delete guide  reviewreport by id_guide_booking
adminRoute.delete("/deleteGuideReviewReport/:id_guide_booking", verifyToken, deleteGuideReviewReport);

//GET: get tourist info by id_tourist
adminRoute.get("/getTouristByID/:id_tourist", verifyToken, getTouristByID);

//GET: get tourist guide booking
adminRoute.get("/getTouristGuideBooking/:id_tourist", verifyToken, getTouristGuideBooking);

//GET: get tourist tour booking
adminRoute.get("/getTouristTourBooking/:id_tourist", verifyToken, getTouristTourBooking);

//GET: get company info by id_company
adminRoute.get("/getCompanyByID/:id_company", verifyToken, getCompanyByID);

//GET: get company tour
adminRoute.get("/getCompanyTour/:id_company", verifyToken, getCompanyTour);

//GET: get company licenses by id_company
adminRoute.get("/getCompanyLicensesByIDCompany/:id_company", verifyToken, getCompanyLicensesByIDCompany);

//GET: get freelancer info by id_guide
adminRoute.get("/getFreelancerByID/:id_guide", verifyToken, getFreelancerByID);

//GET: get freelancer attraction
adminRoute.get("/getFreelancerAttraction/:id_guide", verifyToken, getFreelancerAttraction);

//GET: get freelancer licenses by id_guide
adminRoute.get("/getFreelancerLicensesByIDGuide/:id_guide", verifyToken, getFreelancerLicensesByIDGuide);

//GET: get freelancer time
adminRoute.get("/getFreelancerTime/:id_guide", verifyToken, getFreelancerTime);

//GET: get freelancer language
adminRoute.get("/getFreelancerLanguage/:id_guide", verifyToken, getFreelancerLanguage);

//GET: get array tour
adminRoute.get("/getArrTour", verifyToken, getArrTour);

module.exports = adminRoute;