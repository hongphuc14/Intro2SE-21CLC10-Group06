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
            if (data.avatar){
                const imagePath = '/home/phuc/Projects/Project/Intro2SE-21CLC10-Group06/src/BackEnd/public/admin_avatar/' + data.avatar;
                fs.readFile(imagePath, (err, data) => {
                    if (err) {
                        console.error('Error reading image file:', err);
                        return;
                    }
                    
                    const imageDataBase64 = Buffer.from(data).toString('base64');
                    const imageBase64Url = `data:image/png;base64,${imageDataBase64}`;
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

//GET: get array guide license
const getArrGuideLicense = async(req,res) =>{
    let dataLicense = await model.guide_license.findAll();
    res.send(dataLicense);
}

//GET: get array guide license
const getArrCompanyLicense = async(req,res) =>{
    let dataLicense = await model.company_license.findAll();
    res.send(dataLicense);
}

//GET: get guide license
const getGuideLicense = async(req, res) =>{
    const fs = require('fs');
    const path = require('path');
    try{
        let { id_guide, file_path } = req.params;
        let checkLicense = await model.guide_license.findOne({
            where:{
                id_guide, file_path
            }
        });
        if(checkLicense){
            let data = await model.guide_license.findOne({
                where:{
                    id_guide, file_path
                }
            });
            if (data.file_path){
                const imagePath = '/home/phuc/Projects/Project/Intro2SE-21CLC10-Group06/src/BackEnd/public/freelancer_license/' + data.file_path;
                
                fs.readFile(imagePath, (err, data) => {
                    if (err) {
                        console.error('Error reading image file:', err);
                        return;
                    }
                    
                    const imageDataBase64 = Buffer.from(data).toString('base64');
                    const imageBase64Url = `data:image/png;base64,${imageDataBase64}`;
                    res.send(imageBase64Url);
                });
            }    
        }
        else{
            failCode(res,"","License không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

//GET: get company license
const getCompanyLicense = async(req, res) =>{
    const fs = require('fs');
    const path = require('path');
    try{
        let { id_company, file_path } = req.params;
        let checkLicense = await model.company_license.findOne({
            where:{
                id_company, file_path
            }
        });
        if(checkLicense){
            let data = await model.company_license.findOne({
                where:{
                    id_company, file_path
                }
            });
            if (data.file_path){
                const imagePath = '/home/phuc/Projects/Project/Intro2SE-21CLC10-Group06/src/BackEnd/public/company_license/' + data.file_path;
                
                fs.readFile(imagePath, (err, data) => {
                    if (err) {
                        console.error('Error reading image file:', err);
                        return;
                    }
                    
                    const imageDataBase64 = Buffer.from(data).toString('base64');
                    const imageBase64Url = `data:image/png;base64,${imageDataBase64}`;
                    res.send(imageBase64Url);
                });
            }    
        }
        else{
            failCode(res,"","License không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}
 
//PUT: update company license status by file_path
const updateCompanyLicenseStatus = async(req, res) =>{
    try{
        let { file_path, status } = req.params;
        
        let checkLicense = await model.company_license.findOne({
            where:{
                file_path
            }
        });
        if(checkLicense){
            await model.company_license.update({ 
                status
            }, {
                where:{
                    file_path
                }
            }); 
            let data = await model.company_license.findOne({
                where:{
                    file_path
                }
            });
            res.send(data);
        }
        else{
            failCode(res,"","License không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

//PUT: update freelancer license status by file_path
const updateFreelancerLicenseStatus = async(req, res) =>{
    try{
        let { file_path, status } = req.params;
        let checkLicense = await model.guide_license.findOne({
            where:{
                file_path
            }
        });
        if(checkLicense){
            await model.guide_license.update({ 
                status
            }, {
                where:{
                    file_path
                }
            }); 
            let data = await model.guide_license.findOne({
                where:{
                    file_path
                }
            });
            res.send(data);
        }
        else{
            failCode(res,"","License không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

//GET: get array guide booking
const getArrGuideBooking = async(req,res) =>{
    let dataBooking = await model.guide_booking.findAll();
    res.send(dataBooking);
}

//GET: get array tour booking
const getArrTourBooking = async(req,res) =>{
    let dataBooking = await model.tour_booking.findAll();
    res.send(dataBooking);
}

//GET: get array tourist
const getArrTourist = async(req,res) =>{
    let dataTourist = await model.tourist.findAll();
    res.send(dataTourist);
}

//GET: get array company
const getArrCompany = async(req,res) =>{
    let dataCompany = await model.company.findAll();
    res.send(dataCompany);
}

//GET: get array freelancer
const getArrFreelancer = async(req,res) =>{
    let dataFreelancer = await model.tour_guide.findAll(
        {
            include: ["guide_languages"]
        }
    );
    res.send(dataFreelancer);
}

//GET: get array tour reviews
const getArrTourReview = async(req,res) =>{
    let dataReview = await model.tour_review.findAll();
    res.send(dataReview);
}

//GET: get array guide reviews
const getArrGuideReview = async(req,res) =>{
    let dataReview = await model.guide_review.findAll();
    res.send(dataReview);
}

//GET: get array tour report
const getArrTourReport = async(req,res) =>{
    let dataReport = await model.tour_report.findAll();
    res.send(dataReport);
}

//GET: get array guide report
const getArrGuideReport = async(req,res) =>{
    let dataReport = await model.guide_report.findAll();
    res.send(dataReport);
}

//PUT: update tour report status by id_tour
const updateTourReportStatus = async(req, res) =>{
    try{
        let { id_tour } = req.params;
        let status = 2;
        let checkReport = await model.tour_report.findOne({
            where:{
                id_tour
            }
        });
        if(checkReport){
            await model.tour_report.update({ 
                status
            }, {
                where:{
                    id_tour
                }
            }); 
            let data = await model.tour_report.findOne({
                where:{
                    id_tour
                }
            });
            res.send(data);
        }
        else{
            failCode(res,"","Report không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

//DELETE: delete tour report by id_tour
const deleteTourReport = async(req, res) =>{
    try{
        let { id_tour } = req.params;
        let checkReport = await model.tour_report.findOne({
            where:{
                id_tour
            }
        });
        if(checkReport){
            await model.tour_report.destroy({ 
                where:{
                    id_tour
                }
            }); 
            sucessCode(res, checkReport, "Xóa tour report thành công")
        }
        else{
            failCode(res,"","Report không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

//PUT: update guide report status by id_guide
const updateGuideReportStatus = async(req, res) =>{
    try{
        let { id_guide } = req.params;
        let status = 2;
        let checkReport = await model.guide_report.findOne({
            where:{
                id_guide
            }
        });
        if(checkReport){
            await model.guide_report.update({ 
                status
            }, {
                where:{
                    id_guide
                }
            }); 
            let data = await model.guide_report.findOne({
                where:{
                    id_guide
                }
            });
            res.send(data);
        }
        else{
            failCode(res,"","Report không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

//DELETE: delete guide report by id_guide
const deleteGuideReport = async(req, res) =>{
    try{
        let { id_guide } = req.params;
        let checkReport = await model.guide_report.findOne({
            where:{
                id_guide
            }
        });
        if(checkReport){
            await model.guide_report.destroy({ 
                where:{
                    id_guide
                }
            }); 
            sucessCode(res, checkReport, "Xóa guide report thành công")
        }
        else{
            failCode(res,"","Report không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

//PUT: update tour review report status by id_tour_booking
const updateTourReviewReportStatus = async(req, res) =>{
    try{
        let { id_tour_booking } = req.params;
        console.log(id_tour_booking)
        let report_status = 2;
        let checkReport = await model.tour_review.findOne({
            where:{
                id_tour_booking
            }
        });
        if(checkReport){
            await model.tour_review.update({ 
                report_status
            }, {
                where:{
                    id_tour_booking
                }
            }); 
            let data = await model.tour_review.findOne({
                where:{
                    id_tour_booking
                }
            });
            res.send(data);
        }
        else{
            failCode(res,"","Report không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

//DELETE: delete tour review report by id_tour
const deleteTourReviewReport = async(req, res) =>{
    try{
        let { id_tour_booking } = req.params;
        let checkReport = await model.tour_review.findOne({
            where:{
                id_tour_booking
            }
        });
        if(checkReport){
            await model.tour_review.destroy({ 
                where:{
                    id_tour_booking
                }
            }); 
            sucessCode(res, checkReport, "Xóa tour review report thành công")
        }
        else{
            failCode(res,"","Report không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

//PUT: update guide review report status by id_guide_booking
const updateGuideReviewReportStatus = async(req, res) =>{
    try{
        let { id_guide_booking } = req.params;
        let report_status = 2;
        let checkReport = await model.guide_review.findOne({
            where:{
                id_guide_booking
            }
        });
        if(checkReport){
            await model.guide_review.update({ 
                report_status
            }, {
                where:{
                    id_guide_booking
                }
            }); 
            let data = await model.guide_review.findOne({
                where:{
                    id_guide_booking
                }
            });
            res.send(data);
        }
        else{
            failCode(res,"","Report không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

//DELETE: delete guide report by id_guide_booking
const deleteGuideReviewReport = async(req, res) =>{
    try{
        let { id_guide_booking } = req.params;
        let checkReport = await model.guide_review.findOne({
            where:{
                id_guide_booking
            }
        });
        if(checkReport){
            await model.guide_review.destroy({ 
                where:{
                    id_guide_booking
                }
            }); 
            sucessCode(res, checkReport, "Xóa guide review report thành công")
        }
        else{
            failCode(res,"","Report không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE");
    }
}

//GET: get tourist info by id_tourist
const getTouristByID = async(req, res) =>{
    try{
        let { id_tourist } = req.params;
        let checkTourist = await model.tourist.findOne({
            where:{
                id_tourist
            }
        });
        if(checkTourist){
            let data = await model.tourist.findOne({
                where:{
                    id_tourist
                }
            });
            sucessCode(res,data,"Lấy thành công");
        }
        else{
            failCode(res,"","Tourist không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//GET: get tourist guide booking
const getTouristGuideBooking = async(req,res) =>{
    let { id_tourist } = req.params;
    let checkBooking = await model.guide_booking.findAll({
        where:{
            id_tourist
        }
    });
    if(checkBooking){
        let dataBooking = await model.guide_booking.findAll({
            where:{
                id_tourist
            },
            include:["guide_review"]
        })
        res.send(dataBooking);
    }
}

//GET: get tourist tour booking
const getTouristTourBooking = async(req,res) =>{
    let { id_tourist } = req.params;
    let checkBooking = await model.tour_booking.findAll({
        where:{
            id_tourist
        }
    });
    if(checkBooking){
        let dataBooking = await model.tour_booking.findAll({
            where:{
                id_tourist
            },
            include:["tour_review"]
        })
        res.send(dataBooking);
    }
}

//GET: get company info by id_company
const getCompanyByID = async(req, res) =>{
    try{
        let { id_company } = req.params;
        let checkCompany = await model.company.findOne({
            where:{
                id_company
            }
        });
        if(checkCompany){
            let data = await model.company.findOne({
                where:{
                    id_company
                },
                include: ["company_license"]
            });
            sucessCode(res,data,"Lấy thành công");
        }
        else{
            failCode(res,"","Company không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//GET: get company tour
const getCompanyTour = async(req,res) =>{
    let { id_company } = req.params;
    let checkTour = await model.tour.findAll({
        where:{
            id_company
        }
    });
    if(checkTour){
        let dataTour = await model.tour.findAll({
            where:{
                id_company
            },
            include: [
                {
                    model: model.tour_booking,
                    as: "tour_bookings",
                    include: [
                        {
                            model: model.tour_review,
                            as: "tour_review"
                        }
                    ]
                }
            ]
        })
        res.send(dataTour);
    }
}


//GET: get company licenses by id_company
const getCompanyLicensesByIDCompany = async(req, res) =>{
    console.log("license")
    const fs = require('fs').promises;
    //console.log("license")
    const path = require('path');
    //console.log("license")
    try{
        let { id_company } = req.params;
        let checkLicense = await model.company_license.findAll({
            where:{
                id_company
            }
        });
        if(checkLicense){
            let dataLicenses = await model.company_license.findAll({
                where:{
                    id_company
                }
            });
            const licensePromises = dataLicenses.map(async (data) => {
                if (data.file_path){
                    const imagePath = '/home/phuc/Projects/Project/Intro2SE-21CLC10-Group06/src/BackEnd/public/company_license/' + data.file_path;
                    try {
                        const fileData = await fs.readFile(imagePath);
                        const imageDataBase64 = Buffer.from(fileData).toString('base64');
                        const imageBase64Url = `data:image/png;base64,${imageDataBase64}`;
                        return imageBase64Url;
                    } catch (error) {
                        console.error('Error reading image file:', err);
                        return null;
                    }
                }
            });
            const licenseResults = await Promise.all(licensePromises);
            const validLicenses = licenseResults.filter(image => image !== null);
            console.log(validLicenses);     // Lọc bỏ các phần tử null
            res.send(validLicenses); 
        }
        else{
            failCode(res,"","Company không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

//GET: get freelancer info by id_guide
const getFreelancerByID = async(req, res) =>{
    try{
        let { id_guide } = req.params;
        let checkGuide = await model.tour_guide.findOne({
            where:{
                id_guide
            }
        });
        if(checkGuide){
            let data = await model.tour_guide.findOne({
                where:{
                    id_guide
                },
                include: ["guide_license"]
            });
            sucessCode(res,data,"Lấy thành công");
        }
        else{
            failCode(res,"","Freelancer không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//GET: get freelancer attraction
const getFreelancerAttraction = async(req,res) =>{
    let { id_guide } = req.params;
    let checkAttraction = await model.guide_attraction.findAll({
        where:{
            id_guide
        }
    });
    if(checkAttraction){
        let dataAttraction = await model.guide_attraction.findAll({
            where:{
                id_guide
            }
        })
        res.send(dataAttraction);
    }
}

//GET: get freelancer licenses by id_guide
const getFreelancerLicensesByIDGuide = async(req, res) =>{
    console.log("first")
    const fs = require('fs').promises;
    const path = require('path');
    try{
        let { id_guide } = req.params;
        let checkLicense = await model.guide_license.findAll({
            where:{
                id_guide
            }
        });
        if(checkLicense){
            let dataLicenses = await model.guide_license.findAll({
                where:{
                    id_guide
                }
            });
            const licensePromises = dataLicenses.map(async (data) => {
                if (data.file_path){
                    const imagePath = '/home/phuc/Projects/Project/Intro2SE-21CLC10-Group06/src/BackEnd/public/freelancer_license/' + data.file_path;
                    try {
                        const fileData = await fs.readFile(imagePath);
                        const imageDataBase64 = Buffer.from(fileData).toString('base64');
                        const imageBase64Url = `data:image/png;base64,${imageDataBase64}`;
                        return imageBase64Url;
                    } catch (error) {
                        console.error('Error reading image file:', err);
                        return null;
                    }
                }
            });
            const licenseResults = await Promise.all(licensePromises);
            const validLicenses = licenseResults.filter(image => image !== null);
            //console.log(validLicenses);     // Lọc bỏ các phần tử null
            res.send(validLicenses); 
        }
        else{
            failCode(res,"","Freelancer không tồn tại");
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

//GET: get freelancer time
const getFreelancerTime = async(req,res) =>{
    let { id_guide } = req.params;
    let checkTime = await model.guide_time.findAll({
        where:{
            id_guide
        }
    });
    if(checkTime){
        let dataBooking = await model.guide_time.findAll({
            where:{
                id_guide
            },
            include: [{
                model: model.guide_booking,
                as: "guide_bookings",
                include: [
                    {
                        model: model.guide_review,
                        as: "guide_review"
                    }
                ]
            }]
        })
        res.send(dataBooking);
    }
}

//GET: get freelancer language
const getFreelancerLanguage = async(req,res) =>{
    let { id_guide } = req.params;
    let checkTime = await model.guide_language.findAll({
        where:{
            id_guide
        }
    });
    if(checkTime){
        let dataLang = await model.guide_language.findAll({
            where:{
                id_guide
            }
        })
        res.send(dataLang);
    }
}

//GET: get array tour 
const getArrTour = async(req,res) =>{
    let dataTour = await model.tour.findAll();
    res.send(dataTour);
}

module.exports = { getInfoByID, updateInfoByID, updatePwdByID, uploadAdmin, getAvatarByID,
    getArrGuideLicense, getArrCompanyLicense, getGuideLicense, getCompanyLicense, updateCompanyLicenseStatus,
    updateFreelancerLicenseStatus, getArrGuideBooking, getArrTourBooking, getArrTourist, getArrCompany,
    getArrFreelancer, getArrTourReview, getArrGuideReview, getArrTourReport, getArrGuideReport, updateTourReportStatus,
    deleteTourReport, updateGuideReportStatus, deleteGuideReport, updateTourReviewReportStatus, deleteTourReviewReport,
    updateGuideReviewReportStatus, deleteGuideReviewReport, getTouristByID, getTouristGuideBooking, getTouristTourBooking,
    getCompanyByID, getCompanyTour, getCompanyLicensesByIDCompany, getFreelancerByID, getFreelancerAttraction,
    getFreelancerLicensesByIDGuide, getFreelancerTime, getFreelancerLanguage, getArrTour }