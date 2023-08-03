const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/response');

//GET: get company info by id_guide
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
            res.send(data);
        }
        else{
            failCode(res,"","Company không tồn tại")
        } 
    }catch(err){
        errorCode(res,"Lỗi BE")
    }
} 