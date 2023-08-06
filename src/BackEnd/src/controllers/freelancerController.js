const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');

//GET: get company info by id_company
const getInfoByID = async(req, res) =>{
    try{
        let { id_guide } = req.params;
        let guide = await model.tour_guide.findOne({
            where:{
                id_guide
            }
        });
        if(guide){
            let data = await model.tour_guide.findOne({
                where:{
                    id_guide
                }
            });
            res.send(data);
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
        let { fullname, avatar, phone, gender, birthday,
        id_des, experience, description, price_per_session, free_cancellation } = req.body;
        
        let checkGuide = await model.tour_guide.findOne({
            where:{
                id_guide
            }
        });
        if(checkGuide){
            await model.tour_guide.update({ 
                fullname, avatar, phone, gender, birthday,
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
            let checkPass = bcrypt.compareSync(c_password, checkcompany.password);
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

//POST: upload company avatar by id_company
const uploadAvatar = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const fs = require('fs');
    const id_guide = req.params.id_guide;
    
    //Nếu size tệp vượt quá 4Mb, hàm sẽ xóa tệp và gửi phản hồi
    // if(req.file.size >= 400000){
    //     fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + req.file.filename);
    //     res.send("chỉ được phép upload 4Mb");
    //     return;
    // }
    // // // Nếu định dạng tệp không phải jpeg, jpg, png thì xóa tệp và gửi phản hồi
    // if(req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/png"){
    //     fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + req.file.filename);
    //     res.send("sai định dạng");
    // }
    try{
        //lấy info company từ db
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
    }catch(err){
        fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + req.file.filename);
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

//POST: upload company license by id_company (file img)
const uploadLicense = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const fs = require('fs');
    const id_company = req.params.id_company;
    
    //Nếu size tệp vượt quá 4Mb, hàm sẽ xóa tệp và gửi phản hồi
    if(req.file.size >= 400000){
        fs.unlinkSync(process.cwd() + "/public/company_license/" + req.file.filename);
        res.send("chỉ được phép upload 4Mb");
        return;
    }
    // Nếu định dạng tệp không phải jpeg, jpg, png thì xóa tệp và gửi phản hồi
    if(req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/png"){
        fs.unlinkSync(process.cwd() + "/public/company_license/" + req.file.filename);
        res.send("sai định dạng");
    }
    try{        
        await model.company_license.update({
            file_path: req.file.filename
        }, {
            where:{
                id_company
            }
        });
    }catch(err){
        fs.unlinkSync(process.cwd() + "/public/company_license/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        return;
    }
    fs.readFile(process.cwd() + "/public/company_license/" + req.file.filename, (err, data)=>{
        if(err){
            errorCode(res, "Lỗi khi đọc tệp tin");
            return;
        }
        let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
        res.send(dataBase);
    })
}

module.exports = { getInfoByID, updateInfoByID, updatePwdByID, uploadAvatar, uploadLicense } 