const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');

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
            let checkPass = bcrypt.compareSync(password, checkAdmin.password);
            if(checkPass){
                sucessCode(res, checkAdmin, "Login thành công");
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
            let passWordHash = bcrypt.hashSync(checkTourist.password, 10);
            let checkPass = bcrypt.compareSync(password, passWordHash);
            //let checkPass = bcrypt.compareSync(password, checkTourist.password);
            if(checkPass){
                sucessCode(res, checkTourist, "Login thành công");
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
            let passWordHash = bcrypt.hashSync(checkCompany.password, 10);
            let checkPass = bcrypt.compareSync(password, passWordHash);
            //let checkPass = bcrypt.compareSync(password, checkCompany.password);
            if(checkPass){
                sucessCode(res, checkCompany, "Login thành công");
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
            let passWordHash = bcrypt.hashSync(checkFreelancer.password, 10);
            let checkPass = bcrypt.compareSync(password, passWordHash);
            //let checkPass = bcrypt.compareSync(password, checkFreelancer.password);
            if(checkPass){
                sucessCode(res, checkFreelancer, "Login thành công");
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

module.exports = { login, signUp }