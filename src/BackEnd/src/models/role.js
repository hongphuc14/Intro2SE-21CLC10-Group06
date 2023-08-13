const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return role.init(sequelize, DataTypes);
}

class role extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_role: {
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
    tableName: 'role',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_role" },
        ]
      },
    ]
  });
  }
}
