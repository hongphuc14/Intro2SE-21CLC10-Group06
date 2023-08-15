const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');

//GET: get admin info by id_admin
const getInfoByID = async(req, res) =>{
    try{
        let { id_admin } = req.params;
        let checkAdmin = await model.admin_se.findOne({
            where:{
                id_admin
            }
        });
        if(checkAdmin){
            let data = await model.admin_se.findOne({
                where:{
                    id_admin
                }
            });
            sucessCode(res,data,"Lấy thành công");
        }
        else{
            failCode(res,"","Admin không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//PUT: update admin info by id_admin
const updateInfoByID = async(req, res) =>{
    try{
        let { id_admin } = req.params;
        let { fullname, email, phone, birthday, gender } = req.body;
        
        let checkAdmin = await model.admin_se.findOne({
            where:{
                id_admin
            }
        });
        if(checkAdmin){
            await model.admin_se.update({ 
                fullname, email, phone, birthday, gender
            }, {
                where:{
                    id_admin
                }
            }); 
            let data = await model.admin_se.findOne({
                where:{
                    id_admin
                }
            });
            sucessCode(res,data,"Update thành công");
        }
        else{
            failCode(res,"","Admin không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

const bcrypt = require('bcrypt'); 
//PUT: update admin password by id_admin
const updatePwdByID = async(req, res) =>{
    try{
        let { id_admin } = req.params;
        let { c_password, n_password, cf_password } = req.body;
        let checkAdmin = await model.admin_se.findOne({
            where:{
                id_admin 
            }
        });
        if(checkAdmin){
            let checkPass = bcrypt.compareSync(c_password, checkAdmin.password);
            if(checkPass){
                let passWordHash = bcrypt.hashSync(n_password, 10);
                await model.admin_se.update({ 
                    password:passWordHash
                }, {
                    where:{
                        id_admin
                    }
                }); 
                let data = await model.admin_se.findOne({
                    where:{
                        id_admin
                    }
                });
                sucessCode(res,data,"Update thành công");
            }
            else{
                failCode(res,"","Mật khẩu không đúng");
            }
        }
        else{
            failCode(res,"","Admin không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

//POST: upload admin avatar by id_admin
const uploadAdmin = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const fs = require('fs');
    const id_admin = req.params.id_admin;
    console.log("adminController upload image name: ", req.file.filename);
    //Nếu size tệp vượt quá 4Mb, hàm sẽ xóa tệp và gửi phản hồi
    if(req.file.size >= 400000){
        fs.unlinkSync(process.cwd() + "/public/admin_avatar/" + req.file.filename); //process.cwd() --> Intro2SE-21CLC10-Group06
        res.send("chỉ được phép upload 4Mb");
        return;
    }
    // Nếu định dạng tệp không phải jpeg, jpg, png thì xóa tệp và gửi phản hồi
    if(req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/png"){
        fs.unlinkSync(process.cwd() + "/public/admin_avatar/" + req.file.filename);
        res.send("sai định dạng");
    }
    try{
        let admin = await model.admin_se.findOne({
            where:{
                id_admin
            }
        });
        if(admin){
            if(admin.avatar){
                try{
                    //xóa avatar cũ trước khi update avatar mới
                    fs.unlinkSync(process.cwd() + "/public/admin_avatar/" + admin.avatar);
                } catch(err){
                    console.log("Lỗi khi xóa avatar cũ", err);
                }
            }
        }
        await model.admin_se.update({
            avatar: req.file.filename
        }, {
            where:{
                id_admin
            }
        });
        let data = await model.admin_se.findOne({
            where:{
                id_admin
            }
        });
        sucessCode(res,data,"Upload thành công");
    }catch(err){
        fs.unlinkSync(process.cwd() + "/public/admin_avatar/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        return;
    }
    // fs.readFile(process.cwd() + "/public/admin_avatar/" + req.file.filename, (err, data)=>{
    //     if(err){
    //         errorCode(res, "Lỗi khi đọc tệp tin");
    //         return;
    //     }
    //     let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
    //     //sucessCode(res, dataBase, "Upload thành công");
    //     sucessCode(res, req.file.filename, "Upload thành công");
    // })
}

//GET: get avatar admin by id_admin
const getAvatarByID = async(req, res) =>{
    const fs = require('fs');
    const path = require('path');
    try{
        let { id_admin } = req.params;
        let checkAdmin = await model.admin_se.findOne({
            where:{
                id_admin
            }
        });
        if(checkAdmin){
            let data = await model.admin_se.findOne({
                where:{
                    id_admin
                }
            });
            console.log("data_avatar: ", data.avatar);
            if (data.avatar){
                const imagePath = '/home/phuc/Projects/Project/Intro2SE-21CLC10-Group06/src/BackEnd/public/admin_avatar/' + data.avatar;
                console.log("imagePath: ", imagePath);
                
                fs.readFile(imagePath, (err, data) => {
                    if (err) {
                        console.error('Error reading image file:', err);
                        return;
                    }
                    
                    const imageDataBase64 = Buffer.from(data).toString('base64');
                    const imageBase64Url = `data:image/png;base64,${imageDataBase64}`;
                    console.log(imageBase64Url);
                    res.send(imageBase64Url);
                });
            }    
        }
        else{
            failCode(res,"","Admin không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 
module.exports = { getInfoByID, updateInfoByID, updatePwdByID, uploadAdmin, getAvatarByID }