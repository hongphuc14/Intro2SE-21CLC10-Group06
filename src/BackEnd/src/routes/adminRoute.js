const express = require('express');
const adminRoute = express.Router();
const { getInfoByID, updateInfoByID, updatePwdByID, uploadAdmin } = require('../controllers/adminController')
const { upload } = require('../middlewares/upload');
const { verifyToken } = require("../middlewares/baseToken");

//GET: get admin info by id_admin
<<<<<<< HEAD
adminRoute.get("/getInfo/:id_admin", getInfoByID);

//PUT: update admin info by id_admin
adminRoute.put("/updateInfo/:id_admin", updateInfoByID);

//PUT: update admin password by id_admin
adminRoute.put("/updatePwd/:id_admin", updatePwdByID);

//POST: upload admin avatar by id_admin
adminRoute.post("/uploadAvatar/:id_admin", upload('admin_avatar').single("dataUpload"), uploadAdmin);
=======
adminRoute.get("/getInfo/:id_admin", verifyToken, getInfoByID);

//PUT: update admin info by id_admin
adminRoute.put("/updateInfo/:id_admin", verifyToken, updateInfoByID);

//PUT: update admin password by id_admin
adminRoute.put("/updatePwd/:id_admin", verifyToken, updatePwdByID);

//POST: upload admin avatar by id_admin
adminRoute.post("/uploadAvatar/:id_admin", verifyToken, upload('admin_avatar').single("dataUpload"), uploadAdmin);
>>>>>>> d56f5ef35bb8d2570a75b6e19d2d854ae7467842

module.exports = adminRoute;