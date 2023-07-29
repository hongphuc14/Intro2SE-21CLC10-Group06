const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/reponse');

//login
const login = async(req, res)=>{
    try{
        let { email, password } = req.body;
        let checkLogin = await model.admin_se.findOne({
            where:{
                email
            }
        })
        if(checkLogin){
            let checkPass = bcrypt.compareSync(password, checkLogin.password);
            if(checkPass){
                sucessCode(res, checkLogin, "Login thành công");
            }
            else{
                failCode(res, "", "Mật khẩu không đúng!");
            }
        }
        else{
            failCode(res, "", "Email không đúng!");
        }
    }catch(err){
        errorCode(res, "Lỗi BE");
    } 
}


//POST
const uploadAdmin = async(req, res)=>{
    const fs = require('fs');
    if(req.file.size >= 400000){
        fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
        res.send("chỉ được phép upload 4Mb");
        return;
    }
    if(req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/jpg"){
        fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
        res.send("sai định dạng");
    }
    
    fs.readFile(process.cwd() + "/public/img/" + req.file.filename, (err, data)=>{
        let dataBase = `data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}`;
        setTimeout(()=>{
            fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
        }, 5000);
        res.send(dataBase);
    })
}

module.exports = { login, uploadAdmin }