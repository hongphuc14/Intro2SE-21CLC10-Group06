const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');

//GET: get company info by id_company
const getInfoByID = async(req, res) =>{
    try{
        let { id_company } = req.params;
        let checkcompany = await model.company.findOne({
            where:{
                id_company
            }
        });
        if(checkcompany){
            let data = await model.company.findOne({
                where:{
                    id_company
                }
            });
            sucessCode(res,data,"Lấy thành công");;
        }
        else{
            failCode(res,"","Company không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
} 

//PUT: update company info by id_company
const updateInfoByID = async(req, res) =>{
    try{
        let { id_company } = req.params;
        let { name, address, phone, website, email } = req.body;
        
        let checkCompany = await model.company.findOne({
            where:{
                id_company
            }
        });
        if(checkCompany){
            await model.company.update({ 
                name, address, phone, website, email
            }, {
                where:{
                    id_company
                }
            }); 
            let data = await model.company.findOne({
                where:{
                    id_company
                }
            });
            sucessCode(res,data,"Update thành công");
        }
        else{
            failCode(res,"","Company không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

const bcrypt = require('bcrypt'); 
//PUT: update company password by id_company
const updatePwdByID = async(req, res) =>{
    try{
        let { id_company } = req.params;
        let { c_password, n_password } = req.body;
        
        let checkcompany = await model.company.findOne({
            where:{
                id_company 
            }
        });
        if(checkcompany){
            let checkPass = bcrypt.compareSync(c_password, checkcompany.password);
            if(checkPass){
                let passWordHash = bcrypt.hashSync(n_password, 10);
                await model.company.update({ 
                    password:passWordHash
                }, {
                    where:{
                        id_company
                    }
                }); 
                let data = await model.company.findOne({
                    where:{
                        id_company
                    }
                });
                sucessCode(res,data,"Update thành công")
            }
            else{
                failCode(res,"","Mật khẩu không đúng")
            }
        }
        else{
            failCode(res,"","Company không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

//POST: upload company avatar by id_company
const uploadCompany = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const fs = require('fs');
    const id_company = req.params.id_company;
    
    //Nếu size tệp vượt quá 4Mb, hàm sẽ xóa tệp và gửi phản hồi
    if(req.file.size >= 400000){
        fs.unlinkSync(process.cwd() + "/public/company_avatar/" + req.file.filename);
        res.send("chỉ được phép upload 4Mb");
        return;
    }
    // Nếu định dạng tệp không phải jpeg, jpg, png thì xóa tệp và gửi phản hồi
    if(req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/png"){
        fs.unlinkSync(process.cwd() + "/public/company_avatar/" + req.file.filename);
        res.send("sai định dạng");
    }
    try{
        //lấy info company từ db
        let company = await model.company.findOne({
            where:{
                id_company
            }
        });
        //check nếu đã upload avatar
        if(company){
            if(company.avatar){
                try{
                    //xóa avatar cũ trước khi update avatar mới
                    fs.unlinkSync(process.cwd() + "/public/company_avatar/" + company.avatar);
                } catch(err){
                    console.log("Lỗi khi xóa avatar cũ", err);
                }
            }
        }
        await model.company.update({
            avatar: req.file.filename
        }, {
            where:{
                id_company
            }
        });
    }catch(err){
        fs.unlinkSync(process.cwd() + "/public/company_avatar/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        return;
    }
    fs.readFile(process.cwd() + "/public/company_avatar/" + req.file.filename, (err, data)=>{
        if(err){
            errorCode(res, "Lỗi khi đọc tệp tin");
            return;
        }
        let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
        res.send(dataBase);
    })
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

module.exports = { getInfoByID, updateInfoByID, updatePwdByID, uploadCompany, uploadLicense }