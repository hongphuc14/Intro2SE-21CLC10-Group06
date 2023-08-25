const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return company_license.init(sequelize, DataTypes);
}

class company_license extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_company: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'company',
        key: 'id_company'
      }
    },
    file_path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'company_license',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_company" },
          { name: "file_path" }
        ]
      },
    ]
  });
  }
}
