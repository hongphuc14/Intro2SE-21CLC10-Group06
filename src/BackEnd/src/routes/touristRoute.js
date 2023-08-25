const express = require('express');
const touristRoute = express.Router();
const { getInfoByID, updateInfoByID, updatePwdByID, updateAvatar,
    getTourSearch, getGuideSearch, reportTour, reportGuide, bookTour, 
    bookGuide, cancelGuide, cancelTour, getBookedBooking, getCancelBooking,
    leaveReview } = require('../controllers/touristController')
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

//GET: get tourist info by id_tourist
touristRoute.get("/getInfo/:email",verifyToken, getInfoByID);

//PUT: update tourist info by id_tourist
touristRoute.put("/updateInfo/:id_tourist", verifyToken,  updateInfoByID);

//PUT: update tourist password by id_tourist
touristRoute.put("/updatePwd/:id_tourist", verifyToken, updatePwdByID);

// POST: upload tourist avatar by id_tourist
touristRoute.post("/updateAvatar/:id_tourist", verifyToken, upload('tourist_avatar').single("file"), updateAvatar);

touristRoute.get("/getTourSearch/:destination/:rating/:below_price/:upper_price", getTourSearch);

touristRoute.get("/getGuideSearch/:destination/:rating/:below_price/:upper_price", getGuideSearch);

touristRoute.post("/reportTour/:id_tourist", reportTour);

touristRoute.post("/reportGuide/:id_tourist", reportGuide);

touristRoute.post("/bookTour/:id_tourist", bookTour);

touristRoute.post("/bookGuide/:id_tourist", bookGuide);

// touristRoute.put("/cancelTour/:id_tourist", cancelTour);

// touristRoute.put("/cancelGuide/:id_tourist", cancelGuide);

// touristRoute.get("/getBookedBooking/:id_tourist", getBookedBooking);

// touristRoute.get("/getCancelBooking/:id_tourist", getCancelBooking);

// touristRoute.post("/leaveReview/:id_tourist", leaveReview);

module.exports = touristRoute;