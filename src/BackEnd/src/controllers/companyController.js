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

//GET: get company tour by id_company
const getTourByID = async(req, res) =>{
    try{
        let { id_company } = req.params;
        
        let checkCompany = await model.company.findOne({
            where:{
                id_company
            }
        });
        if(checkCompany){
            const [data, metadata] = await sequelize.query
            (`SELECT tour.*, tour_photo.photo_path 
            FROM tour LEFT JOIN tour_photo ON tour.id_tour = tour_photo.id_tour 
            WHERE tour.id_company = ${id_company} AND tour.is_deleted = false`);

            sucessCode(res,data,"Get thành công")
        }
        else{
            failCode(res,"","Company không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

// PUT: update tour info by id_tour
const updateTourInfo = async(req, res)=>{
    const id_tour = req.params.id_tour;
    const {name, id_des, id_category, num_max, duration, description, included, not_included,
    schedule, price, free_cancellation, is_deleted, id_company } = req.body

    try{
        const checkTour = await model.tour.findOne({
            where:{
                id_tour
            }
        })
        if (checkTour){
            await model.tour.update({
                name, id_des, id_category, num_max, duration, description, included, not_included,
                schedule, price, free_cancellation, is_deleted
            },{
                where:{
                    id_tour,
                }
            });
        }
        else{
            await model.tour.create({
                name, id_company, id_des, id_category, num_max, duration, description, included, not_included,
                schedule, price, free_cancellation, is_deleted
            }); 
        }
        sucessCode(res,"","Delete thành công")
    }catch(err){
        // fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        return;
    }
}

//POST: update freelancer avatar by id_company
const updateTourFile = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const fs = require('fs');
    const id_tour = req.params.id_tour;
    const file = req.file;
    try{
        let tour = await model.tour.findOne({
            where:{
                id_tour
            }
        });
        //check nếu đã upload photo
        if(tour){
            const exist = await model.tour_photo.findOne({
                where:{
                    id_tour
                }              
            })
            if(exist){
                try{
                    //xóa avatar cũ trước khi update avatar mới
                    fs.unlinkSync(process.cwd() + "/public/tour/" + exist.photo_path);
                } catch(err){
                    console.log("Lỗi khi xóa avatar cũ", err);
                }
                await model.tour_photo.update({
                    photo_path: file.filename
                }, {
                    where:{
                        id_tour
                    }
                });
            }
            else{
                await model.tour_photo.create({
                    photo_path: file.filename,
                    id_tour
                });
            }
            
        sucessCode(res,"","Update thành công")
        }
    }catch(err){
        // fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        return;
    }
}

// PUT: delete company tour by id_tour
const deleteTour = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const fs = require('fs');
    const id_tour = req.params.id_tour;

    try{
        const checkTour = await model.tour.findOne({
            where:{
                id_tour
            }
        })
        if (checkTour){
            // xoa file
            const photo = await model.tour_photo.findOne({
                where:{
                    id_tour
                }
            })
            if (photo){
                try{
                    fs.unlinkSync(process.cwd() + "/public/tour/" + photo.photo_path);
                } catch(err){
                    console.log("Lỗi khi xóa", err);
                } 
                await model.tour_photo.destroy({
                    where:{
                        id_tour,
                    }
                });
            }
            await model.tour.update({
                is_deleted: true
            },{
                where:{
                    id_tour,
                }
            });
            const changeStatus = [1,2,3]
            await model.tour_booking.update({
                status: 7
            },{
                where:{
                    status: {
                        [Op.in]: changeStatus
                    },
                }
            });

            sucessCode(res,"","Delete thành công")
        }
        else
            failCode(res,"","Tour không tồn tại")
    }catch(err){
        // fs.unlinkSync(process.cwd() + "/public/freelancer_avatar/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        return;
    }
}

//GET: get company review by id_company
const getBooking = async(req, res) =>{
    try{
        let { id_company } = req.params;
        
        let checkCompany = await model.company.findOne({
            where:{
                id_company
            }
        });
        if(checkCompany){
            const [allTour, metadata] = await sequelize.query
            (`SELECT DISTINCT tour.name, tour.id_des, tour.num_max, tour.price,
            tour_photo.photo_path, tour_booking.id_tour, tour_booking.start_date, tour_booking.end_date
            FROM tour
            INNER JOIN tour_booking ON tour.id_tour = tour_booking.id_tour
            INNER JOIN tour_photo ON tour.id_tour = tour_photo.id_tour
            WHERE tour.id_company = ${id_company}`);

            const [allBooking, meta] = await sequelize.query
            (`SELECT tour_booking.*, tourist.*
            FROM tour
            INNER JOIN tour_booking ON tour.id_tour = tour_booking.id_tour
            INNER JOIN tourist ON tour_booking.id_tourist = tourist.id_tourist
            WHERE tour.id_company = ${id_company}`);

            const data = allTour.map(item => {
                const booking = allBooking.filter(itemm => itemm.id_tour == item.id_tour || itemm.start_date.toString().slice(0,10) == item.start_date.toString().slice(0,10))
                // dt = item.start_date.toString().slice(0,10)
                return {...item, booking}
            })
            sucessCode(res,data,"Get thành công")
        }
        else{
            failCode(res,"","Company không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

// PUT: update booking reply by id_company
const updateBooking = async(req, res) =>{
    try{
        let {id_tour_booking} = req.params
        let {status } = req.body;
        
        let checkBooking = await model.tour_booking.findOne({
            where:{
                id_tour_booking
            }
        });
        if(checkBooking){
            await model.tour_booking.update({ 
                status
            }, {
                where:{
                    id_tour_booking
                }
            }); 
            sucessCode(res,"","Update thành công")
        }
        else{
            failCode(res,"","Review không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

//GET: get company review by id_company
const getReview = async(req, res) =>{
    try{
        let { id_company } = req.params;
        
        let checkCompany = await model.company.findOne({
            where:{
                id_company
            }
        });
        if(checkCompany){
            const [allReview, metadata] = await sequelize.query
            (`SELECT tour.id_tour, tourist.fullname, tourist.avatar, tour_review.*
            FROM tour 
            INNER JOIN tour_booking ON tour.id_tour = tour_booking.id_tour 
            INNER JOIN tour_review ON tour_review.id_tour_booking = tour_booking.id_tour_booking
            LEFT JOIN tourist ON tour_booking.id_tour_booking = tourist.id_tourist
            WHERE tour.id_company = ${id_company} AND tour.is_deleted = 0`);

            const [allTour, meta] = await sequelize.query
            (`SELECT tour.*, tour_photo.photo_path
            FROM tour 
            LEFT JOIN tour_photo ON tour.id_tour = tour_photo.id_tour 
            WHERE tour.id_company = ${id_company} AND tour.is_deleted = 0`);

            const data = allTour.map(item => {
                const review = allReview.filter(itemm => itemm.id_tour == item.id_tour)
                const totalReview = review.reduce((accumulator,element) => {
                    if (element.review)
                     return accumulator + 1
                    else
                      return accumulator
                  }, 0)
                let length = 0;
                const totalRating = review.reduce((accumulator,element) => {
                if (element.rating){
                    length += 1
                    return accumulator + element.rating
                }
                else
                    return accumulator
                }, 0)
                const rating = length ? totalRating / length : null
                return {id_tour: item.id_tour, name: item.name, id_des: item.id_des, photo_path: item.photo_path, 
                    totalReview: totalReview, rating: Math.floor(rating), review}
            })
            sucessCode(res,data,"Get thành công")
        }
        else{
            failCode(res,"","Company không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

// PUT: update booking reply by id_company
const updateReply = async(req, res) =>{
    try{
        let { id_tour_booking, reply, reply_date } = req.body;
        
        let checkReview = await model.tour_review.findOne({
            where:{
                id_tour_booking
            }
        });
        if(checkReview){
            await model.tour_review.update({ 
                reply, reply_date
            }, {
                where:{
                    id_tour_booking
                }
            }); 
            sucessCode(res,"","Update thành công")
        }
        else{
            failCode(res,"","Review không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

// PUT: update booking report by id_company
const updateReport = async(req, res) =>{
    try{
        let { id_tour_booking, report, report_date } = req.body;
        
        let checkReview = await model.tour_review.findOne({
            where:{
                id_tour_booking
            }
        });
        if(checkReview){
            await model.tour_review.update({ 
                report, report_date
            }, {
                where:{
                    id_tour_booking
                }
            }); 
            sucessCode(res,"","Update thành công")
        }
        else{
            failCode(res,"","Company không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

module.exports = { getInfoByID, getLicenseByID, updateInfoByID, updateAvatarByID, deleteAvatarByID, 
    updatePwdByID, deleteLicenseByID, updateLicenseByID, getTourByID, updateTourInfo, updateTourFile, 
    getBooking, updateBooking, deleteTour, getReview, updateReply, updateReport}