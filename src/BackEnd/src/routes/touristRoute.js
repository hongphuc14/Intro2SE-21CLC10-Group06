const express = require('express');
const touristRoute = express.Router();
const { getInfoByID, updateInfoByID, updatePwdByID, uploadTourist } = require('../controllers/touristController')
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

//GET: get tourist info by id_tourist
touristRoute.get("/getInfo/:id_tourist", verifyToken, getInfoByID);

//PUT: update tourist info by id_tourist
touristRoute.put("/updateInfo/:id_tourist", verifyToken, updateInfoByID);

//PUT: update tourist password by id_tourist
touristRoute.put("/updatePwd/:id_tourist", verifyToken, updatePwdByID);

//POST: upload tourist avatar by id_tourist
touristRoute.post("/uploadAvatar/:id_tourist", verifyToken, upload('tourist_avatar').single("dataUpload"), uploadTourist);

module.exports = touristRoute;