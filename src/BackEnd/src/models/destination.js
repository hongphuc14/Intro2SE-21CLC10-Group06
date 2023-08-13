const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return destination.init(sequelize, DataTypes);
}

class destination extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_des: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'destination',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_des" },
        ]
      },
    ]
  });
  }
}
