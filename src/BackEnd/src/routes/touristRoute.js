const express = require('express');
const touristRoute = express.Router();
const { getInfoByID, updateInfoByID, updatePwdByID, updateAvatar } = require('../controllers/touristController')
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

//GET: get tourist info by id_tourist
touristRoute.get("/getInfo/:email", getInfoByID);

//PUT: update tourist info by id_tourist
touristRoute.put("/updateInfo/:id_tourist",  updateInfoByID);

//PUT: update tourist password by id_tourist
touristRoute.put("/updatePwd/:id_tourist", updatePwdByID);

//POST: upload tourist avatar by id_tourist
// touristRoute.post("/updateAvatar/:id_tourist", upload('tourist_avatar').single("file"), updateAvatar);

module.exports = touristRoute;