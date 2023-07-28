const express = require('express');
const adminRoute = express.Router();
const { login, uploadAdmin } = require('../controllers/adminController')
const { upload } = require('../middlewares/upload');

//login
adminRoute.get("/login", login);



adminRoute.post("/upload_base", upload.single("dataUpload"), uploadAdmin);
//POST upload
adminRoute.post("/upload-avatar", upload.single("dataUpload"), (req, res)=>{
    console.log(req.file); 
});

module.exports = adminRoute;