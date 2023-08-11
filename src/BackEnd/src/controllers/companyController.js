const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");

//GET: get company info by id_company
const getInfoByID = async(req, res) =>{
    try{
        let { email } = req.params;
        let checkcompany = await model.company.findOne({
            where:{
                email
            }
        });
        if(checkcompany){
            let data = await model.company.findOne({
                where:{
                    email
                }
            });
            data.password = "********"
            sucessCode(res,data,"Get thành công")
        }
        else{
            failCode(res,"","Company không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//GET: get company license by id_company
const getLicenseByID = async(req, res) =>{
    try{
        let { id_company } = req.params;
        
        let checkCompany = await model.company.findOne({
            where:{
                id_company
            }
        });
        if(checkCompany){
            let data = await model.company_license.findAll({
                where:{
                    id_company
                }
            });
            data = data.map(item =>{
                const {file_path, status} = item
                return {file_path, status}
            })
            sucessCode(res,data,"Update thành công")
        }
        else{
            failCode(res,"","Company không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

//PUT: update company info by id_company
const updateInfoByID = async(req, res) =>{
    try{
        let { id_company } = req.params;
        let { name, address, phone, website } = req.body;
        
        let checkCompany = await model.company.findOne({
            where:{
                id_company
            }
        });
        if(checkCompany){
            await model.company.update({ 
                name, address, phone, website
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
            failCode(res,"","Company không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const bcrypt = require('bcrypt'); 
//PUT: update company password by id_company
// 12345678
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
                sucessCode(res,"","Update thành công")
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

//POST: update freelancer avatar by id_company
const updateAvatarByID = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const fs = require('fs');
    const id_company = req.params.id_company;
    const file = req.file;
    try{
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
            await model.company.update({
                avatar: file.filename
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
    }catch(err){
        // fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        return;
    }
}

// PUT: delete freelancer avatar by id_company
const deleteAvatarByID = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const fs = require('fs');
    const id_company = req.params.id_company;
    try{
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
                    fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + company.avatar);
                } catch(err){
                    console.log("Lỗi khi xóa avatar cũ", err);
                }
            }
            await model.company.update({
                avatar: ""
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
    const id_company = req.params.id_company;
    const license = req.body.license;

    try{
        const notDelete = []
        for (const item of license){
            const {file_path} = item;
            notDelete.push( file_path)
        }


        let allLicense = await model.company_license.findAll({
            where:{
                id_company
            }
        });   

        allLicense.forEach(license => {
            if (!notDelete.includes(license.file_path)){
                try{
                    fs.unlinkSync(process.cwd() + "/public/company_license/" + license.file_path);
                } catch(err){
                    console.log("Lỗi khi xóa", err);
                } 
            }
        })

        await model.company_license.destroy({
            where:{
                id_company,
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
const updateLicenseByID = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const id_company = req.params.id_company;
    const files = req.files

    try{
        for (const file of files) {
            await model.company_license.create({
                id_company: id_company,
                file_path: file.filename,
                status: 1
            });
        }

        let data = await model.company_license.findAll({
            where:{
                id_company
            }
        });
        sucessCode(res,data,"Update thành công")

    }catch(err){
        // fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        return;
    }
}

module.exports = { getInfoByID, getLicenseByID, updateInfoByID, updateAvatarByID, deleteAvatarByID, 
    updatePwdByID, deleteLicenseByID, updateLicenseByID}