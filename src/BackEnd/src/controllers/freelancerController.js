const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");

//GET: get freelancer info by id_guide
const getInfoByID = async(req, res) =>{
    try{
        let { email } = req.params;
        
        let guide = await model.tour_guide.findOne({
            where:{
                email
            }
        });
        if(guide){
            let data = await model.tour_guide.findOne({
                where:{
                    email
                }
            });
            sucessCode(res,data,"Get thành công")
        }
        else{
            failCode(res,"","Freelancer không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//GET: get freelancer languages by id_guide
const getLanguageByID = async(req, res) =>{
    try{
        let { id_guide } = req.params;
        let guide = await model.tour_guide.findOne({
            where:{
                id_guide
            }
        });
        if(guide){
            let data = await model.guide_language.findAll({
                where:{
                    id_guide
                }
            });
            data = data.map(data => {
                const {id_lang} = data
                return id_lang
            })
            sucessCode(res,data,"Get thành công")
        }
        else{
            failCode(res,"","Freelancer không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//GET: get freelancer license by id_guide
const getLicenseByID = async(req, res) =>{
    try{
        let { id_guide } = req.params;
        let guide = await model.tour_guide.findOne({
            where:{
                id_guide
            }
        });
        if(guide){
            let data = await model.guide_license.findAll({
                where:{
                    id_guide
                }
            });
            data = data.map(data => {
                const {file_path, status} = data
                return {file_path, status} 
            })
            sucessCode(res,data,"Get thành công")
        }
        else{
            failCode(res,"","Freelancer không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//GET: get freelancer attration by id_guide
const getAttractionByID = async(req, res) =>{
    try{
        let { id_guide } = req.params;
        let guide = await model.tour_guide.findOne({
            where:{
                id_guide
            }
        });
        if(guide){
            let data = await model.guide_attraction.findAll({
                where:{
                    id_guide
                }
            });
            data = data.map(data => {
                const {id_attraction, photo_path, title, content} = data
                return {id_attraction, photo_path, title, content}
            })
            sucessCode(res,data,"Get thành công")
        }
        else{
            failCode(res,"","Freelancer không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//GET: get freelancer time by id_guide
const getTimeByID = async(req, res) =>{
    try{
        let { id_guide } = req.params;
        let guide = await model.tour_guide.findOne({
            where:{
                id_guide
            }
        });
        if(guide){
            let data = await model.guide_time.findAll({
                where:{
                    id_guide
                }
            });
            data = data.map(data => {
                const {guide_date, guide_session, is_available} = data
                return {guide_date, guide_session, is_available} 
            })
            sucessCode(res,data,"Get thành công")
        }
        else{
            failCode(res,"","Freelancer không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//PUT: update freelancer info by id_guide
const updateInfoByID = async(req, res) =>{
    try{
        let { id_guide } = req.params;
        let { fullname, phone, gender, birthday,
        id_des, experience, description, price_per_session, free_cancellation } = req.body;
        
        let checkGuide = await model.tour_guide.findOne({
            where:{
                id_guide
            }
        });
        if(checkGuide){
            await model.tour_guide.update({ 
                fullname, phone, gender, birthday,
                id_des, experience, description, price_per_session, free_cancellation
            }, {
                where:{
                    id_guide
                }
            }); 
            let data = await model.tour_guide.findOne({
                where:{
                    id_guide
                }
            });
            sucessCode(res,data,"Update thành công")
        }
        else{
            failCode(res,"","Freelancer không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

//PUT: update company password by id_company
// lấy id_guide = 1 để test. pass mới là 1234567890
const bcrypt = require('bcrypt'); 
const updatePwdByID = async(req, res) =>{
    try{
        let { id_guide } = req.params;
        let { c_password, n_password } = req.body;
        
        let checkGuide = await model.tour_guide.findOne({
            where:{
                id_guide 
            }
        });
        if(checkGuide){
            let checkPass = bcrypt.compareSync(c_password, checkGuide.password);
            if(checkPass){
                let passWordHash = bcrypt.hashSync(n_password, 10);
                await model.tour_guide.update({ 
                    password:passWordHash
                }, {
                    where:{
                        id_guide
                    }
                }); 
                let data = await model.tour_guide.findOne({
                    where:{
                        id_guide
                    }
                });
                sucessCode(res,data,"Update thành công")
            }
            else{
                failCode(res,"","Mật khẩu không đúng")
            }
        }
        else{
            failCode(res,"","Freelancer không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

//PUT: update freelancer language by id_guide
const updateLanguageByID = async(req, res) =>{
    try{
        let { id_guide } = req.params;
        let { language } = req.body;
        
        let checkGuide = await model.tour_guide.findOne({
            where:{
                id_guide 
            }
        });
        if(checkGuide){
            await model.guide_language.destroy({
                where: {
                    id_guide
                }
            })
            for (const lang of language){
                await model.guide_language.create({
                    id_guide: id_guide,
                    id_lang: lang
                })
            }
            let data = await model.guide_language.findAll({
                where:{
                    id_guide
                }
            });
            data = data.map(data => {
                const {id_lang} = data
                return id_lang
            })
            sucessCode(res,data,"Update thành công")
        }
        else{
            failCode(res,"","Freelancer không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

//POST: update freelancer avatar by id_guide
const updateAvatarByID = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const fs = require('fs');
    const id_guide = req.params.id_guide;
    const file = req.file;
    try{
        let guide = await model.tour_guide.findOne({
            where:{
                id_guide
            }
        });
        //check nếu đã upload avatar
        if(guide){
            if(guide.avatar){
                try{
                    //xóa avatar cũ trước khi update avatar mới
                    fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + guide.avatar);
                } catch(err){
                    console.log("Lỗi khi xóa avatar cũ", err);
                }
            }
            await model.tour_guide.update({
                avatar: req.file.filename
            }, {
                where:{
                    id_guide
                }
            });
            let data = await model.tour_guide.findOne({
                where:{
                    id_guide
                }
            });
        sucessCode(res,data,"Update thành công")
        }
    }catch(err){
        // fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        return;
    }
    // fs.readFile(process.cwd() + "/public/freelancer_avatar/" + req.file.filename, (err, data)=>{
    //     if(err){
    //         errorCode(res, "Lỗi khi đọc tệp tin");
    //         return;
    //     }
    //     let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
    //     res.send(dataBase);
    // })
}

// PUT: delete freelancer avatar by id_guide
const deleteAvatarByID = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const fs = require('fs');
    const id_guide = req.params.id_guide;
    try{
        let guide = await model.tour_guide.findOne({
            where:{
                id_guide
            }
        });
        //check nếu đã upload avatar
        if(guide){
            if(guide.avatar){
                try{
                    //xóa avatar cũ trước khi update avatar mới
                    fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + guide.avatar);
                } catch(err){
                    console.log("Lỗi khi xóa avatar cũ", err);
                }
            }
            await model.tour_guide.update({
                avatar: ""
            }, {
                where:{
                    id_guide
                }
            });
            let data = await model.tour_guide.findOne({
                where:{
                    id_guide
                }
            });
        sucessCode(res,data,"Update thành công")
        }
    }catch(err){
        // fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        return;
    }
}

// PUT: delete freelancer license by id_guide
const deleteLicenseByID = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const fs = require('fs');
    const id_guide = req.params.id_guide;
    const license = req.body.license;

    try{
        const notDelete = []
        for (const item of license){
            const {file_path} = item;
            notDelete.push( file_path)
        }


        let allLicense = await model.guide_license.findAll({
            where:{
                id_guide
            }
        });   

        allLicense.forEach(license => {
            if (!notDelete.includes(license.file_path)){
                try{
                    fs.unlinkSync(process.cwd() + "/public/freelancer_license/" + license.file_path);
                } catch(err){
                    console.log("Lỗi khi xóa", err);
                } 
            }
        })

        await model.guide_license.destroy({
            where:{
                id_guide,
                file_path:{
                    [Op.notIn]: notDelete
                }
            }
        });

        sucessCode(res,"","Update thành công")

    }catch(err){
        // fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        return;
    }
}

// POST: update freelancer license by id_guide
//POST: upload company license by id_company (file img)
const updateLicenseByID = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const id_guide = req.params.id_guide;
    const files = req.files

    try{
        for (const file of files) {
            await model.guide_license.create({
                id_guide: id_guide,
                file_path: file.filename,
                status: 1
            });
        }

        let data = await model.guide_license.findAll({
            where:{
                id_guide
            }
        });
        sucessCode(res,files,"Update thành công")

    }catch(err){
        // fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        return;
    }
}

module.exports = { getInfoByID, getLanguageByID, getLicenseByID, getAttractionByID, getTimeByID,
updateInfoByID, updatePwdByID, updateLanguageByID, updateAvatarByID, deleteAvatarByID, 
deleteLicenseByID, updateLicenseByID } 