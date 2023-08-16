const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { Op } = require("sequelize");

//GET: get tourist info by id_tourist
const getInfoByID = async(req, res) =>{
    try{
        let { email } = req.params;
        let checkTourist = await model.tourist.findOne({
            where:{
                email
            }
        });
        if(checkTourist){
            sucessCode(res,checkTourist,"Get thanh cong")
        }
        else{
            failCode(res,"","Tourist không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

//PUT: update tourist info by id_tourist
const updateInfoByID = async(req, res) =>{
    try{
        let { id_tourist } = req.params;
        let { fullname, phone, birthday, gender } = req.body;
        
        let checkTourist = await model.tourist.findOne({
            where:{
                id_tourist
            }
        });
        if(checkTourist){
            await model.tourist.update({ 
                fullname, phone, birthday, gender
            }, {
                where:{
                    id_tourist
                }
            }); 
            let data = await model.tourist.findOne({
                where:{
                    id_tourist
                }
            });
            sucessCode(res,data,"Update thành công")
        }
        else{
            failCode(res,"","Tourist không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

//PUT: update tourist password by id_tourist
const updatePwdByID = async(req, res) =>{
    try{
        let { id_tourist } = req.params;
        let { c_password, n_password } = req.body;
        
        let checkTourist = await model.tourist.findOne({
            where:{
                id_tourist 
            }
        });
        if(checkTourist){
            let checkPass = bcrypt.compareSync(c_password, checkTourist.password);
            if(checkPass){
                let passWordHash = bcrypt.hashSync(n_password, 10);
                await model.tourist.update({ 
                    password:passWordHash
                }, {
                    where:{
                        id_tourist
                    }
                }); 
                let data = await model.tourist.findOne({
                    where:{
                        id_tourist
                    }
                });
                sucessCode(res,data,"Update thành công")
            }
            else{
                failCode(res,"","Mật khẩu không đúng")
            }
        }
        else{
            failCode(res,"","Tourist không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

//POST: upload tourist avatar by id_tourist
const updateAvatar = async(req, res)=>{
    //import 'fs' (file system) để làm việc với các tệp tin trong hệ thống tệp của Node.js
    const fs = require('fs');
    const id_tourist = req.params.id_tourist;
    
    //Nếu size tệp vượt quá 4Mb, hàm sẽ xóa tệp và gửi phản hồi
    if(req.file.size >= 4  * 1024 * 1024){
        fs.unlinkSync(process.cwd() + "/public/tourist_avatar/" + req.file.filename);
        failCode(res,"","Chỉ được phép upload 4Mb");
        return;
    }
    // Nếu định dạng tệp không phải jpeg, jpg, png thì xóa tệp và gửi phản hồi
    if(req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/png"){
        fs.unlinkSync(process.cwd() + "/public/tourist_avatar/" + req.file.filename);
        failCode(res,"","Hình ảnh phải có dạng jpeg, jpg, png ");
        return
    }
    try{
        //lấy info tourist từ db
        let tourist = await model.tourist.findOne({
            where:{
                id_tourist
            }
        });
        //check nếu đã upload avatar
        if(tourist){
            if(tourist.avatar){
                try{
                    //xóa avatar cũ trước khi update avatar mới
                    fs.unlinkSync(process.cwd() + "/public/tourist_avatar/" + tourist.avatar);
                } catch(err){
                    console.log("Lỗi khi xóa avatar cũ", err);
                }
            }
        }
        await model.tourist.update({
            avatar: req.file.filename
        }, {
            where:{
                id_tourist
            }
        });
        sucessCode(res,"","Update thành công")
    }catch(err){
        fs.unlinkSync(process.cwd() + "/public/tourist_avatar/" + req.file.filename);
        errorCode(res, "Lỗi BE");
        // return;
    }
    // fs.readFile(process.cwd() + "/public/tourist_avatar/" + req.file.filename, (err, data)=>{
    //     if(err){
    //         errorCode(res, "Lỗi khi đọc tệp tin");
    //         return;
    //     }
    //     let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
    //     res.send(dataBase);
    // })
}

const getTourSearch = async(req, res) =>{
    try{
        let { destination, rating, price } = req.params;

        const [tour_search, metadata] = await sequelize.query
            (`SELECT tour.id_tour
            FROM tour 
            INNER JOIN tour_booking ON tour.id_tour = tour_booking.id_tour
            INNER JOIN tour_review ON tour_review.id_tour_booking = tour_booking.id_tour_booking
            WHERE tour.is_deleted = 0 AND tour.id_des = ${destination} AND
            tour.price <= ${price}
            GROUP BY tour.id_tour
            HAVING ${rating} <= AVG(tour_review.rating) AND AVG(tour_review.rating) < ${rating + 1}`);

        const id_search = []
        for (const item of tour_search){
            id_search.push(item.id_tour)
        }

        let data = await model.tour.findAll({
            where:{
                id_tour: {
                    [Op.in]: id_search
                }
            }
        })
        sucessCode(res,data,"Get thanh cong")
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

const getGuideSearch = async(req, res) =>{
    try{
        let { destination, rating, price } = req.params;

        const [guide_search, metadata] = await sequelize.query
            (`SELECT tour_guide.id_guide
            FROM tour_guide 
            INNER JOIN guide_time ON guide_time.id_guide = tour_guide.id_guide
            INNER JOIN guide_booking ON guide_time.id_guidetime = guide_booking.id_guidetime
            INNER JOIN guide_review ON guide_review.id_guidebooking = guide_booking.id_guidebooking
            WHERE tour_guide.id_des = ${destination} AND tour_guide.price_per_session <= ${price}
            GROUP BY tour_guide.id_guide
            HAVING ${rating} <= AVG(guide_review.rating) AND AVG(guide_review.rating) < ${rating + 1}
            `);
            

        const id_search = []
        for (const item of guide_search){
            id_search.push(item.id_guide)
        }

        let data = await model.tour_guide.findAll({
            where:{
                id_guide: {
                    [Op.in]: id_search
                }
            }
        })

        for (const item of data){
            item.password = '*********'
        }
        sucessCode(res,data,"Get thanh cong")
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

module.exports = { getInfoByID, updateInfoByID, updatePwdByID, updateAvatar,
    getTourSearch, getGuideSearch }