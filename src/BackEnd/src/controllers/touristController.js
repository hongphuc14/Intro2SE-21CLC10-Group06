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
        let { destination, rating, below_price, upper_price } = req.params;
        
        below_price = parseInt(below_price)
        upper_price = parseInt(upper_price)
        destination = parseInt(destination)
        rating = parseInt(rating)
        let upper_rating = 0
        if (rating === -1)
            upper_rating = 6
        else 
            upper_rating = rating + 1

        const [tour_search, metadata] = await sequelize.query
            (`SELECT tour.id_tour, tour.name, tour.price, tour.duration,
            tour.num_max, tour.description, tour.included, tour.not_included,
            tour.schedule, tour.ggmap_address, tour.free_cancellation, tour.schedule,
            destination.name as destination, company.name as company, company.phone,
            tour_photo.photo_path, tour_category.name as category, 
            COUNT(tour_review.rating) as num_review,
                CASE
                    WHEN COUNT(tour_review.rating) = 0 THEN 0
                    ELSE AVG(tour_review.rating) 
                END as rating
            FROM tour 
            INNER JOIN destination ON tour.id_des = destination.id_des
            INNER JOIN tour_category ON tour.id_category = tour_category.id_category
            INNER JOIN company ON tour.id_company = company.id_company
            LEFT JOIN tour_photo ON tour_photo.id_tour = tour.id_tour
            LEFT JOIN tour_booking ON tour.id_tour = tour_booking.id_tour
            LEFT JOIN tour_review ON tour_review.id_tour_booking = tour_booking.id_tour_booking
            WHERE tour.is_deleted = 0 AND tour.id_des = ${destination} AND
            tour.price <= ${upper_price} AND  tour.price >= ${below_price}
            GROUP BY tour.id_tour, tour.name, tour.price, tour.duration, tour.schedule, 
            tour.num_max, destination.name, company.name, tour_photo.photo_path,
            tour.description, tour.included, tour.not_included, tour_category.name,
            tour.schedule, tour.ggmap_address, tour.free_cancellation
            `);

        let data = []
        const tours = tour_search.filter( tour => rating <= tour.rating && upper_rating > tour.rating)
        
        for (const tour of tours){
            const [reviews, metadata] = await sequelize.query
                (`SELECT tour_review.review, tour_review.review_date, tour_review.rating,
                tourist.fullname, tourist.avatar, tour_review.id_tour_booking, tour_review.reply,
                tour_review.reply_date
                FROM tour_review
                INNER JOIN tour_booking ON tour_review.id_tour_booking = tour_booking.id_tour_booking
                INNER JOIN tourist ON tour_booking.id_tourist = tourist.id_tourist
                WHERE tour_booking.id_tour = ${tour.id_tour}
                LIMIT 2`)
            // const id_ = language.map (lang => lang.lang_name)
            
            data.push({...tour, tourist_reviews: [...reviews]});
        }

        sucessCode(res,data,"Get thanh cong")
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

const getGuideSearch = async(req, res) =>{
    try{
        let { destination, rating, below_price, upper_price } = req.params;
        
        below_price = parseInt(below_price)
        upper_price = parseInt(upper_price)
        destination = parseInt(destination)
        rating = parseInt(rating)
        let upper_rating = 0
        if (rating === -1)
            upper_rating = 6
        else 
            upper_rating = rating + 1

        const [guide_search, metadata] = await sequelize.query
            (`SELECT tour_guide.id_guide, tour_guide.fullname, tour_guide.experience, tour_guide.phone,
            destination.name as destination, tour_guide.avatar, tour_guide.price_per_session as price,
            COUNT(guide_review.rating) as num_review,
                CASE
                    WHEN COUNT(guide_review.rating) = 0 THEN 0
                    ELSE AVG(guide_review.rating) 
                END as rating
            FROM tour_guide
            INNER JOIN destination ON tour_guide.id_des = destination.id_des 
            LEFT JOIN guide_time ON guide_time.id_guide = tour_guide.id_guide
            LEFT JOIN guide_booking ON guide_time.id_guidetime = guide_booking.id_guidetime
            LEFT JOIN guide_review ON guide_review.id_guidebooking = guide_booking.id_guidebooking
            WHERE tour_guide.id_des = ${destination} AND 
            tour_guide.price_per_session >= ${below_price} AND tour_guide.price_per_session <= ${upper_price}
            GROUP BY tour_guide.id_guide, tour_guide.fullname, tour_guide.experience,
            destination.name, tour_guide.avatar, tour_guide.phone
            `);
        
            const guides = guide_search.filter( guide => rating <= guide.rating && upper_rating > guide.rating)

            let data = []

            for (const guide of guides){
                const [language, metadata] = await sequelize.query
                    (`SELECT languages.lang_name
                    FROM guide_language
                    INNER JOIN languages ON guide_language.id_lang = languages.id_lang
                    WHERE guide_language.id_guide = ${guide.id_guide}`)
                const id_lang = language.map (lang => lang.lang_name)

                const [attraction, metadata1] = await sequelize.query
                    (`SELECT guide_attraction.*
                    FROM guide_attraction
                    WHERE guide_attraction.id_guide = ${guide.id_guide}`)

                const [reviews, metadata2] = await sequelize.query
                    (`SELECT guide_review.review, guide_review.review_date, guide_review.rating,
                    guide_review.reply, guide_review.reply_date, 
                    tourist.fullname, tourist.avatar, guide_review.id_guidebooking
                    FROM guide_review
                    INNER JOIN guide_booking ON guide_review.id_guidebooking = guide_booking.id_guidebooking
                    INNER JOIN guide_time ON guide_time.id_guidetime = guide_booking.id_guidetime
                    INNER JOIN tourist ON guide_booking.id_tourist = tourist.id_tourist
                    WHERE guide_time.id_guide = ${guide.id_guide}
                    LIMIT 2`)

                const [times, metadata3] = await sequelize.query
                    (`SELECT guide_time.guide_date
                    FROM guide_time
                    WHERE guide_time.id_guide = ${guide.id_guide} AND guide_time.is_available = 1 AND
                    guide_time.guide_date > NOW()
                    GROUP BY guide_time.guide_date`)
                
                if (times !== []){
                    let freetime = []

                    for (const time of times){

                        let result = await model.guide_time.findAll({
                            where:{
                                id_guide: guide.id_guide,
                                guide_date: time.guide_date
                            }
                        })

                        sessions = result.map((res => res.guide_session))
                        freetime.push({date: time.guide_date, sessions: sessions})
                    }
                
                    data.push({...guide, language: [...id_lang], attractions: [...attraction], 
                    reviews: [...reviews], times: [...freetime] });
                    // data.push(...freetime)
                }   
            }

            sucessCode(res,data,"Get thanh cong")

        // sucessCode(res,data,"Get thanh cong")
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const reportTour = async(req, res) =>{
    try{
        let { id_tourist } = req.params;
        let { id_tour, report, report_date } = req.body;
        
        let checkTourist = await model.tourist.findOne({
            where:{
                id_tourist
            }
        });
        if(checkTourist){
            let checkReport = await model.tour_report.findOne({
                where:{
                    id_tourist, id_tour
                }
            });
            if(checkReport){
                await model.tour_report.update({ 
                     report_date, status: 1, content: report
                }, {
                    where:{
                        id_tourist, id_tour
                    }
                }); 
            }
            else
                await model.tour_report.create({ 
                    id_tour, report_date, id_tourist, status: 1, content: report
                }); 
            sucessCode(res,checkReport,"Report tour successfully")
        }
        else{
            failCode(res,"","Tourist không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const reportGuide = async(req, res) =>{
    try{
        let { id_tourist } = req.params;
        let { id_guide, report, report_date } = req.body;
        
        let checkTourist = await model.tourist.findOne({
            where:{
                id_tourist
            }
        });
        if(checkTourist){
            let checkReport = await model.guide_report.findOne({
                where:{
                    id_tourist, id_guide
                }
            });
            if(checkReport){
                await model.guide_report.update({ 
                     content: report, report_date, status: 1
                }, {
                    where:{
                        id_tourist, id_guide
                    }
                }); 
            }
            else
                await model.guide_report.create({ 
                    id_guide, content: report, report_date, id_tourist, status: 1
                }); 
            // let data = await model.tourist.findOne({
            //     where:{
            //         id_tourist
            //     }
            // });
            sucessCode(res,"","Report guide successfully")
        }
        else{
            failCode(res,"","Tourist không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const bookTour = async(req, res) =>{
    try{
        let { id_tourist } = req.params;
        let { id_tour, booking_date, start_date, end_date, num_tourist,	total_price} = req.body;
        
        let checkTourist = await model.tourist.findOne({
            where:{
                id_tourist
            }
        });
        if(checkTourist){
                let checkTour = await model.tour.findOne({
                    where:{
                        id_tour
                    }
                })
                await model.tour_booking.create({ 
                    id_tourist, id_tour, booking_date, start_date, end_date, num_tourist, total_price, 
                    status: 1,
                    free_cancel: checkTour.free_cancellation
                }); 
            sucessCode(res,"","Create thành công")
        }
        else{
            failCode(res,"","Tourist không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const bookGuide = async(req, res) =>{
    try{
        let { id_tourist } = req.params;
        let { id_guide, date, session, booking_date, meeting_point, price} = req.body;
        
        let checkGuide = await model.tour_guide.findOne({
            where:{
                id_guide
            }
        });
        if(checkGuide){
                await model.guide_time.update({
                    is_available: 0
                },{
                    where:{
                        guide_date: date,
                        guide_session: session,
                        id_guide
                    }
                })
                const guidetime = await model.guide_time.findOne({
                    where:{
                        guide_date: date,
                        guide_session: session,
                        id_guide
                    }
                })

                await model.guide_booking.create({ 
                    id_tourist, id_guidetime: guidetime.id_guidetime, booking_date, meeting_point, price, 
                    status: 1,
                    // free_cancel: checkGuide.free_cancellation
                }); 
            sucessCode(res,guidetime ,"Create thành công")
        }
        else{
            failCode(res,"","Tourist không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const cancelGuide = async(req, res) =>{
    try{
        let { id_tourist } = req.params;
        let { id_guidebooking} = req.body;
        
        let checkTourist = await model.guide_booking.findOne({
            where:{
                id_guidebooking, id_tourist
            }
        });
        if(checkTourist){
            const [guide, metadata] = await sequelize.query
            (`SELECT tour_guide.free_cancellation,guide_time.guide_date
            FROM guide_booking
            INNER JOIN guide_time ON guide_time.id_guidetime = guide_booking.id_guidetime
            INNER JOIN tour_guide ON tour_guide.id_guide = guide_time.id_guide 
            WHERE guide_booking.id_guidebooking = ${id_guidebooking}`);

            let status = 3
            let compare = new Date(guide[0].guide_date) - new Date() 
            if (!guide[0].free_cancellation)
                if (compare <= 24 * 60 * 60 * 1000){
                status = 4
            }
            await model.guide_booking.update({ 
                status,
            },{
                where:{
                    id_guidebooking 
                }
            }); 
            sucessCode(res,"","Update thành công")
        }
        else{
            failCode(res,"","Tourist không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const cancelTour = async(req, res) =>{
    try{
        let { id_tourist } = req.params;
        let { id_tour_booking} = req.body;
        
        let tour = await model.tour_booking.findOne({
            where:{
                id_tour_booking, id_tourist
            }
        });
        if(tour){
                let status = 3
                let compare = new Date(tour.end_date) - new Date() 
                if (!tour.free_cancel)
                    if (compare <= 24 * 60 * 60 * 1000){
                    status = 4
                }
                await model.tour_booking.update({ 
                    status,
                },{
                    where:{
                        id_tour_booking 
                    }
                }); 
            sucessCode(res,"","Update thành công")
        }
        else{
            failCode(res,"","Tourist không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const getBookedBooking = async(req, res) =>{
    try{
        let { id_tourist } = req.params;

        const [tour, metadata] = await sequelize.query
            (`SELECT *
            FROM tour_booking 
            INNER JOIN tour ON tour.id_tour = tour_booking.id_tour
            INNER JOIN tour_photo ON tour.id_tour = tour_photo.id_tour
            WHERE tour_booking.id_tourist = ${id_tourist} AND tour_booking.status = 1`);

        // const [guide, meta] = await sequelize.query
        //     (`SELECT *
        //     FROM guide_booking 
        //     INNER JOIN guide_time ON guide_time.id_guidetime = guidebooking.id_guidetime
        //     INNER JOIN tour_guide ON tour_guide.id_guide = guide_time.id_guide
        //     WHERE guide_booking.id_tourist = ${id_tourist} AND 
        //     (tour_booking.status = 1 OR tour_booking.status = 5 )`);

        // let data = {tour: [...tour], guide: [...guide]}
        sucessCode(res,tour,"Get thanh cong")
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
}

const getCancelBooking = async(req, res) =>{
    try{
        let { destination, rating, price } = req.params;

        const [tour_search, metadata] = await sequelize.query
            (`SELECT tour.*, company.name, tour_photo.photo_path, AVG(tour_review.rating)
            FROM tour 
            INNER JOIN tour_review ON tour_review.id_tour_booking = tour_booking.id_tour_booking
            LEFT JOIN tour_photo ON tour_photo.id_tour = tour.id_tour
            WHERE tour.is_deleted = 0 AND tour.id_des = ${destination} AND
            tour.price <= ${price}
            GROUP BY tour.*, company.name, tour_photo.photo_path
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

const leaveReview = async(req, res) =>{
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

module.exports = { getInfoByID, updateInfoByID, updatePwdByID, updateAvatar,
    getTourSearch, getGuideSearch, reportTour, reportGuide, bookTour, bookGuide,
    cancelGuide, cancelTour, getBookedBooking, getCancelBooking, leaveReview }