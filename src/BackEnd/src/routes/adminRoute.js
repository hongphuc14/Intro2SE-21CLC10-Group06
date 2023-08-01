const express = require('express');
const adminRoute = express.Router();
const { login, getInfoByID, updateInfoByID, updatePwdByID, uploadAdmin } = require('../controllers/adminController')
const { upload } = require('../middlewares/upload');

//GET: login
adminRoute.get("/login", login);

//GET: get admin info by id_admin
adminRoute.get("/getInfo/:id_admin", getInfoByID);

//PUT: update admin info by id_admin
adminRoute.put("/updateInfo/:id_admin", updateInfoByID);

//PUT: update admin password by id_admin
adminRoute.put("/updatePwd/:id_admin", updatePwdByID);

//POST: upload admin avatar by id_admin
adminRoute.post("/uploadAvatar/:id_admin", upload.single("dataUpload"), uploadAdmin);

module.exports = adminRoute;