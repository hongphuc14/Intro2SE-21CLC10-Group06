const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');
const { parseToken, clearLocalStorage } = require('../middlewares/baseToken');

const bcrypt = require('bcrypt'); 
//GET: login
const login = async(req, res)=>{
    try{
        let { email, password } = req.body;
        // Admin login
        let checkAdmin = await model.admin_se.findOne({
            where:{
                email
            }
        })
        if(checkAdmin){
            console.log("admin")
            let checkPass = bcrypt.compareSync(password, checkAdmin.password);
            if(checkPass){

                sucessCode(res, parseToken(checkAdmin), "Login thành công");
                return;
            }
            else{
                failCode(res, "", "Mật khẩu không đúng!");
                return;
            }
        }

        // Tourist login
        let checkTourist = await model.tourist.findOne({
            where:{
                email
            }
        })
        if(checkTourist){
            console.log("tourist")
            let checkPass = bcrypt.compareSync(password, checkTourist.password);
            if(checkPass){
                sucessCode(res, parseToken(checkTourist), "Login thành công");
                return;
            }
            else{
                failCode(res, "", "Mật khẩu không đúng!");
                return;
            }
        }
        
        // company login
        let checkCompany = await model.company.findOne({
            where:{
                email
            }
        })
        if(checkCompany){
            let checkPass = bcrypt.compareSync(password, checkCompany.password);
            if(checkPass){
                sucessCode(res, parseToken(checkCompany), "Login thành công");
                return;
            }
            else{
                failCode(res, "", "Mật khẩu không đúng!");
                return;
            }
        }
        
        // freelancer login
        let checkFreelancer = await model.tour_guide.findOne({
            where:{
                email
            }
        })
        if(checkFreelancer){
            let checkPass = bcrypt.compareSync(password, checkFreelancer.password);
            if(checkPass){
                sucessCode(res, parseToken(checkFreelancer), "Login thành công");
                return;
            }
            else{
                failCode(res, "", "Mật khẩu không đúng!");
                return;
            }
        }
        else{
            failCode(res, "", "Email không đúng!");
        }
    }catch(err){
        errorCode(res, "Lỗi BE");
    } 
}

//sign up
const signUp = async(req, res) =>{
    try{
        let { email, password, id_role } = req.body;
        //tourist signup
        if(id_role == 1){
            let checkEmail = await model.tourist.findOne({
                where:{
                    email
                }
            })
            if(checkEmail){
                failCode(res,"","Email đã tồn tại");
                return;
            }
            else{
                let passWordHash = bcrypt.hashSync(password, 10);
                let data = await model.tourist.create({ email, password: passWordHash, id_role });
                sucessCode(res, data, "Đăng ký thành công !");
                return;
            }
        }
        //company signup
        if(id_role == 2){
            let checkEmail = await model.company.findOne({
                where:{
                    email
                }
            })
            if(checkEmail){
                failCode(res,"","Email đã tồn tại");
                return;
            }
            else{
                let passWordHash = bcrypt.hashSync(password, 10);
                let data = await model.company.create({ email, password: passWordHash, id_role });
                sucessCode(res, data, "Đăng ký thành công !");
                return;
            }
        }
        //freelance signup
        if(id_role == 3){
            let checkEmail = await model.tour_guide.findOne({
                where:{
                    email
                }
            })
            if(checkEmail){
                failCode(res,"","Email đã tồn tại");
                return;
            }
            else{
                let passWordHash = bcrypt.hashSync(password, 10);
                let data = await model.tour_guide.create({ email, password: passWordHash, id_role });
                sucessCode(res, data, "Đăng ký thành công !");
                return;
            }
        }   
    }
    catch(err){
        errorCode(res, "Loi BE");
    }
}

const deleteAccount = async(req, res) => {
    try {
        let { id_role, id } = req.params;
        //tourist delete account
        if(id_role == 1){
            let checkTourist = await model.tourist.findOne({
                where:{
                    id
                }
            })
            if(checkTourist){
                await model.tourist.destroy({ 
                    where:{
                        id
                    }
                });
                sucessCode(res,checkTourist,"Xóa dữ liệu thành công");
                return;
            }
            else{
                failCode(res,"","Tourist không tồn tại");
                return;
            }
        }
        //company delete account
        if(id_role == 2){
            let checkCompany = await model.company.findOne({
                where:{
                    id
                }
            })
            if(checkCompany){
                await model.company.destroy({ 
                    where:{
                        id
                    }
                });
                sucessCode(res,checkCompany,"Xóa dữ liệu thành công");
                return;
            }
            else{
                failCode(res,"","Company không tồn tại");
                return;
            }
        }
        //freelance delete account
        if(id_role == 3){
            let checkFreelancer = await model.tour_guide.findOne({
                where:{
                    id
                }
            })
            if(checkFreelancer){
                await model.tour_guide.destroy({ 
                    where:{
                        id
                    }
                });
                sucessCode(res,checkFreelancer,"Xóa dữ liệu thành công");
                return;
            }
            else{
                failCode(res,"","Freelancer không tồn tại");
                return;
            }
        }   
    } catch (error) {
        errorCode(res, "Loi BE");
    }
}

const getDestination = async(req, res) => {
    try{
        let destinations = await model.destination.findAll()
        sucessCode(res, destinations, "Get successfully");
    }catch(err){
        errorCode(res, "Lỗi BE");
    }
}

//GET: get user info by email
const getInfoByEmail = async(req, res) =>{
    try{
        let { email } = req.params;
        let checkAdmin = await model.admin_se.findOne({
            where:{
                email
            }
        })
        if(checkAdmin){
            sucessCode(res, checkAdmin, "Login thành công");
            return;
        }    

        let checkTourist = await model.tourist.findOne({
            where:{
                email
            }
        })
        if(checkTourist){
            sucessCode(res, checkTourist, "Login thành công");
                return;
        }
        
        let checkCompany = await model.company.findOne({
            where:{
                email
            }
        })
        if(checkCompany){
            sucessCode(res, parseToken(checkCompany), "Login thành công");
            return;
        }
        
        let checkFreelancer = await model.tour_guide.findOne({
            where:{
                email
            }
        })
        if(checkFreelancer){
            sucessCode(res, parseToken(checkFreelancer), "Login thành công");
            return;
        }
        else{
            failCode(res, "", "Email không đúng!");
            return;
        }
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 

module.exports = { login, signUp, deleteAccount, getDestination, getInfoByEmail }