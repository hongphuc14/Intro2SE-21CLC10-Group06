const { Sequelize} = require('sequelize');
const config = require('../config/index')

const sequelize = new Sequelize(config.db_name,config.db_user,config.db_pass,{
    host:config.db_host,
    dialect:config.db_dialect,
    port:config.db_port
})

module.exports = sequelize;